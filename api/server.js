const express = require("express")
const carsRouter = require('./cars/cars-router'); // Replace with the actual path to your carsRouter file

const server = express()

server.use(express.json())

server.use('/api/cars', carsRouter)

server.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  });

// DO YOUR MAGIC

module.exports = server
