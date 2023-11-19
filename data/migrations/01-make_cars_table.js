
exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
    table.increments('id'); // Creates an auto-incrementing primary key column named 'id'
    table.string('vin').unique().notNullable(); // 'vin' column, unique and required
    table.string('make').notNullable(); // 'make' column, required
    table.string('model').notNullable(); // 'model' column, required
    table.decimal('mileage').notNullable(); // 'mileage' column, required, using decimal for numeric values
    table.string('title'); // 'title' column, optional
    table.string('transmission'); // 'transmission' column, optional
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars'); // Drops the 'cars' table if it exists
};
