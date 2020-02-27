exports.up = function (knex) {
  return knex.schema.createTable("sensors", sensors => {
    sensors.increments();
    sensors.string("name", 100).unique().notNullable();
    sensors.integer("number").notNullable();
    sensors.integer("localId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("locals")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    sensors.integer("type", 255).unsigned();
    sensors.integer("dayMin", 255).unsigned();
    sensors.integer("dayMax", 255).unsigned();
    sensors.integer("nightMin", 255).unsigned();
    sensors.integer("nightMax", 255).unsigned();
    sensors.integer("dayHour", 255).unsigned();
    sensors.integer("dayMinute", 255).unsigned();
    sensors.integer("nightHour", 255).unsigned();
    sensors.integer("nightMinute", 255).unsigned();
    sensors.integer("pinInput", 255).unsigned();
    sensors.integer("pinOutput", 255).unsigned();
    sensors.boolean("pinOutputInverted");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sensors');
};
