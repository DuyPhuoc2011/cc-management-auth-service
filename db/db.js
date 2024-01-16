const pgp = require('pg-promise')(/* options */)
var env = process.env.NODE_ENV || 'development';
console.log("Environment:", env);
// var env = 'production';
const config = require('./config')[env];
console.log('postgres://' + config.database.db_user + ':'+ config.database.db_pass +'@' + config.database.db_host + ':' + config.database.db_port + '/' + config.database.db_database);
const db = pgp('postgres://' + config.database.db_user + ':'+ config.database.db_pass +'@' + config.database.db_host + ':' + config.database.db_port + '/' + config.database.db_database)
module.exports = db;