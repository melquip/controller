const db = require('../data/dbConfig.js');

module.exports = (table) => ({
  get: () => {
    return db(table);
  },
  findOne: (search) => {
    return db(table)
      .where(search)
      .first();
  },
  find: (search) => {
    return db(table)
      .where(search)
  },
  findIn: (field, search) => {
    return db(table)
      .whereIn(field, search)
  },
  insert: (row) => {
    return db(table)
      .insert(row)
      .then(ids => {
        return getById(ids[0]);
      });
  },
  update: (id, changes) => {
    return db(table)
      .where({ id })
      .update(changes);
  },
  remove: (id) => {
    return db(table)
      .where('id', id)
      .del();
  },
});