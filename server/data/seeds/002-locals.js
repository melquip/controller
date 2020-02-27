exports.seed = function(knex) {
  return knex('locals').truncate()
    .then(function () {
      return knex('locals').insert([
        {
          "name": "Local1",
          "number": 1,
          "userId": 1
        },
        {
          "name": "Local2",
          "number": 2,
          "userId": 1
        },
        {
          "name": "Local3",
          "number": 3,
          "userId": 1
        }
      ]);
    });
};
