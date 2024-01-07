const mysql = require("mysql2"); // MYSQL

// Get data from Env file
const { MAIN_HOST, MAIN_USERNAME, MAIN_PASSWORD, MAIN_DATABASE } = process.env;

module.exports = mysql.createPool({
  host: MAIN_HOST,
  user: MAIN_USERNAME,
  database: MAIN_DATABASE,
  password: MAIN_PASSWORD,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  multipleStatements: true,
});
