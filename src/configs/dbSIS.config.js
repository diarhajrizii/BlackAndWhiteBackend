const mysql = require("mysql2"); // MYSQL

const dbSIS = mysql.createPool({
  host: process.env.SIS_HOST,
  user: process.env.SIS_USER,
  database: process.env.SIS_DATABASE,
  password: process.env.SIS_PASSWORD,
  port: Number(process.env.SIS_PORT),
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  multipleStatements: true,
});

module.exports = dbSIS;
