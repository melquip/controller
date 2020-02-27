module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './server/data/controller.db',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './server/data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './server/data/seeds',
    },
  },
};
