const db = require('../../data/db-config'); // Adjust the path as per your project structure

// Get all car records
function getAll() {
  return db('cars'); // Assuming 'cars' is the name of your table
}

// Get a car record by id
function getById(id) {
  return db('cars').where({ id }).first(); // Returns the first record that matches the id
}

// Create a new car record
async function create(car) {
  const [id] = await db('cars').insert(car); // Insert the new car record and return the id
  return getById(id); // Return the newly created car record
}

function getByVin (vin) {
  return db('cars').where({ vin }).first(); // Returns the first record that matches the VIN or null if not found
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};