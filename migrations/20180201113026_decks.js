exports.up = function(knex, Promise) {
  return knex.schema.createTable('decks', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable().defaultTo("HOORAY for Math!");
    table.specificType('questions', 'jsonb[]');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('decks');
};
