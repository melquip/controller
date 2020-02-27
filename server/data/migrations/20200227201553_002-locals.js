exports.up = function (knex) {
  return knex.schema.createTable('locals', locals => {
    locals.increments();
    locals.string('name', 100).unique().notNullable();
    locals.integer('number').notNullable();
    locals.integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locals');
};
