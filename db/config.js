const config = {
  development: {
    database: {
      db_user: 'postgres',
      db_pass: 'Pa55w0rd',
      db_host: 'localhost',
      db_port: '5432',
      db_database: 'ccmanagement'
    },
  },
  production: {
    database: {
      db_user: 'postgres',
      db_pass: 'Pa55w0rd',
      db_host: '10.10.0.14',
      db_port: '5437',
      db_database: 'postgres'
    },
  }
};
module.exports = config