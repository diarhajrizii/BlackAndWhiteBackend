const mysql = require("mysql2"); // MYSQL
var dbMain = mysql.createPool({
  host: process.env.L_HOST,
  database: process.env.L_DATABASE,
  user: process.env.L_USERNAME,
  password: process.env.L_PASSWORD,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  multipleStatements: true,
});

module.exports = dbMain;
