const mysql = require("mysql2"); // MYSQL

module.exports = mysql.createPool({
  host: process.env.MAIN_HOST,
  user: process.env.MAIN_USERNAME,
  database: process.env.MAIN_DATABASE,
  password: process.env.MAIN_PASSWORD,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  multipleStatements: true,
});
