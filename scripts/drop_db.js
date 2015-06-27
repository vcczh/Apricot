var mysql = require('mysql');
var dbconfig = require('../models/dbconfig');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('DROP DATABASE ' + dbconfig.database);

console.log('Success: Database Dropped!');

connection.end();