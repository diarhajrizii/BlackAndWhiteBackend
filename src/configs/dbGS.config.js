const mysql = require("mysql2"); // MYSQL

var dbGS = mysql.createPool({
  host: process.env.GS_HOST,
  user: process.env.GS_USERNAME,
  database: process.env.GS_DATABASE,
  password: process.env.GS_PASSWORD,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  multipleStatements: true,
});

module.exports = dbGS;
