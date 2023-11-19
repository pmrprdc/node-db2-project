const express = require('express');
const Cars = require('./cars-model');
const { 
  checkCarId, 
  checkCarPayload, 
  checkVinNumberValid, 
  checkVinNumberUnique 
} = require('./cars-middleware');

const router = express.Router();

// [GET] /api/cars - Get all cars
router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars); 
  } catch (err) {
    next(err);
  }
});

// [GET] /api/cars/:id - Get a car by id
router.get('/:id', checkCarId, (req, res) => {
  res.json(req.car);
});

// [POST] /api/cars - Create a new car
router.post('/', 
  checkCarPayload, 
  checkVinNumberValid, 
  checkVinNumberUnique, 
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);



module.exports = router;
