const bcrypt = require('bcryptjs');
const { adminpw } = require('../../config.js')
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          "username": "admin",
          "password": bcrypt.hashSync(adminpw, 11)
        },
      ]);
    });
};
