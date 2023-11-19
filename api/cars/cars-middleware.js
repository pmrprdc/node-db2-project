const Cars = require('./cars-model'); // Adjust the path as per your project structure
const vinValidator = require('vin-validator');

async function checkCarId(req, res, next) {
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car; // Add car to the request object for future use
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkCarPayload(req, res, next) {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    return res.status(400).json({ message: "vin is missing" });
  } else if (!make) {
    return res.status(400).json({ message: "make is missing" });
  } else if (!model) {
    return res.status(400).json({ message: "model is missing" });
  } else if (mileage === undefined) {
    return res.status(400).json({ message: "mileage is missing" });
  }
  next();
}

async function checkVinNumberValid(req, res, next) {
  if (!vinValidator.validate(req.body.vin)) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
}

async function checkVinNumberUnique(req, res, next) {
  const existing = await Cars.getByVin(req.body.vin);
  if (existing) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};





