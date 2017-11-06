exports.up = function(knex, Promise) {
  return knex.schema.createTable('sites', (table) => {
    table.increments('id').primary();
    table.string('url').notNullable().unique();
    table.string('title').notNullable().defaultTo("the latest web app from senbenito!!");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sites');
};
