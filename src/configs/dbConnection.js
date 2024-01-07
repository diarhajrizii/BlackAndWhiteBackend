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

  async executeMultiQuery({ queries, values, useTransaction }) {
    const connection = await module.exports.getConnection("main");
    if (!useTransaction) {
      // Execute queries without transaction
      const results = await executeQueries(connection, queries, values);
      return { status: true, data: results };
    }

    return new Promise((resolve, rejected) => {
      connection.beginTransaction(function (err) {
        if (err) {
          return rejected({ status: false, err });
        }

        const promises = [];

        for (let i = 0; i < queries.length; i++) {
          const query = queries[i];
          const value = values[i];

          const promise = new Promise((resolveQuery, rejectQuery) => {
            connection.query(query, value, function (err, result) {
              if (err) {
                return rejectQuery(err);
              }
              return resolveQuery(result);
            });
          });

          promises.push(promise);
        }

        Promise.all(promises)
          .then((results) => {
            connection.commit(function (err) {
              if (err) {
                return connection.rollback(function () {
                  connection.end();
                  return rejected({ status: false, err });
                });
              }
              connection.end();
              return resolve({ status: true, data: results });
            });
          })
          .catch((error) => {
            connection.rollback(function () {
              connection.end();
              return rejected({ status: false, error });
            });
          });
      });
    });
  },

  async executeQueries(connection, queries, values) {
    const promises = [];

    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      const value = values[i];

      const promise = new Promise((resolveQuery, rejectQuery) => {
        connection.query(query, value, function (err, result) {
          if (err) {
            return rejectQuery(err);
          }
          return resolveQuery(result);
        });
      });

      promises.push(promise);
    }

    try {
      const results = await Promise.all(promises);
      connection.end();
      return results;
    } catch (error) {
      connection.end();
      throw error;
    }
  },
};
