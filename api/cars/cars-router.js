// DO YOUR MAGIC
const express = require('express');
const Cars = require('./cars-model'); // Adjust the path as per your project structure

const router = express.Router();

// [GET] /api/cars - Get all cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars.sort((a, b) => a.id - b.id)); // Sorting by id
  } catch (err) {
    next(err); // Pass errors to Express error handling middleware
  }
});

// [GET] /api/cars/:id - Get a car by id
router.get('/:id', async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (err) {
    next(err); // Pass errors to Express error handling middleware
  }
});

// [POST] /api/cars - Create a new car
router.post('/', async (req, res, next) => {
  try {
    const newCar = await Cars.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    next(err); // Pass errors to Express error handling middleware
  }
});

module.exports = router;