const mysql = require("mysql2"); // MYSQL

module.exports = {
  async getConnection(dbType) {
    let host;
    let user;
    let password;
    let database;
    switch (dbType) {
      case "main":
        host = process.env.MAIN_HOST;
        user = process.env.MAIN_USERNAME;
        database = process.env.MAIN_DATABASE;
        password = process.env.MAIN_PASSWORD;
        break;
      case "cms":
        host = process.env.MAIN_HOST;
        user = process.env.MAIN_USERNAME;
        database = process.env.CMS_DATABASE;
        password = process.env.MAIN_PASSWORD;
        break;
      case "gs":
        host = process.env.GS_HOST;
        user = process.env.GS_USERNAME;
        database = process.env.GS_DATABASE;
        password = process.env.GS_PASSWORD;
        break;
      default:
        return false;
    }
    const dbConnection = mysql.createConnection({
      host,
      user,
      database,
      password,
      multipleStatements: true,
    });
    return dbConnection;
  },

  async executeMultiQuery({ query, value, dbType }) {
    const connection = await module.exports.getConnection(dbType);
    return new Promise((resolve, rejected) => {
      connection.query(query, value, function (err, result) {
        if (err) {
          connection.rollback(function () {
            connection.end();
            return rejected({ status: false, err });
          });
        } else {
          connection.commit(function (err) {
            if (err) {
              return connection.rollback(function () {
                return rejected({ status: false, err });
              });
            }
            connection.end();
            return resolve({ status: true, data: result });
          });
        }
      });
    });
  },
};
