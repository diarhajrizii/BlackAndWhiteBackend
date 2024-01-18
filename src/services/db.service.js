async function query({ sql, params, connection }) {
  return new Promise((resolve, reject) => {
    try {
      if (!connection) throw { message: "Connection is required" };
      if (!sql) throw { message: "Query is required" };
      if (!params) throw { message: "Parameters are required" };

      connection.query(sql, params, (err, result) => {
        if (err) throw err;
        return resolve({ status: true, data: result });
      });
    } catch (error) {
      return reject(error);
    }
  });
}

async function insert({ table_name, params, connection }) {
  return new Promise((resolve, reject) => {
    try {
      if (!table_name) throw { message: "Table name is required" };
      if (!params) throw { message: "column name is required" };
      if (!connection) throw { message: "Connection is required" };

      const columns = Object.keys(params);
      let query = "";
      const query_values = [];
      let insert_query = "";
      let insert_values = "";
      for (let i = 0; i < columns.length; i++) {
        let column_name = columns[i];
        if (params[column_name] == "undefined") {
          continue;
        }
        column_name = column_name.replace(/[^a-zA-Z0-9_]/g, "");
        insert_query += "`" + column_name + "`";
        insert_values += "?";
        if (columns.length != i + 1) {
          insert_query += ", ";
          insert_values += ",";
        }
        query_values.push(params[column_name]);
      }
      query = `INSERT INTO ${table_name} (${insert_query}) VALUES (${insert_values});`;

      connection.query(query, query_values, (err, result) => {
        if (err) throw err;
        return resolve(result.insertId);
      });
    } catch (error) {
      return reject(error);
    }
  });
}

async function update({ table_name, params, where, connection }) {
  return new Promise((resolve, reject) => {
    try {
      if (!connection) throw { message: "Connection is required" };
      if (!table_name) throw { message: "Table name is required" };
      if (!params) throw { message: "Parameters are required" };
      if (!where) throw { message: "Where condition parameter is required" };
      let query = `UPDATE ${table_name} SET `;
      const query_params = [];

      // UPDATE COLUMNS
      const keys = Object.keys(params);
      for (let i = 0; i < keys.length; i++) {
        const key_name = keys[i];
        query += `${key_name} = ?`;
        query_params.push(params[key_name]);
        if (i + 1 !== keys.length) {
          query += `, `;
        }
      }

      // WHERE
      query += " WHERE ";
      const whereKeys = Object.keys(where);
      for (let i = 0; i < whereKeys.length; i++) {
        const element = whereKeys[i];
        query += `${element} = ?`;
        query_params.push(where[element]);
        if (i + 1 !== whereKeys.length) {
          query += ` AND `;
        }
      }

      // EXECUTE

      connection.query(query, query_params, (err, result) => {
        if (err) {
          throw err;
        } else {
          return resolve(result);
        }
      });
    } catch (error) {
      return reject(error);
    }
  });
}

async function deleteV1({ table_name, where, connection = dbMain }) {
  return new Promise((resolve, rejected) => {
    try {
      if (!connection) throw { message: "Connection is required" };
      if (!table_name) throw { message: "table_name is required" };
      if (!where) throw { message: "Where condition parameter is required" };

      let query = `DELETE FROM ${table_name}`;
      const query_params = [];
      // WHERE
      query += " WHERE ";
      const whereKeys = Object.keys(where);
      for (let i = 0; i < whereKeys.length; i++) {
        const element = whereKeys[i];
        query += `${element} = ?`;
        query_params.push(where[element]);
        if (i + 1 !== whereKeys.length) {
          query += ` AND `;
        }
      }
      console.log(query, query_params);

      // EXECUTE
      connection.query(query, query_params, (err, result) => {
        if (err) {
          throw err;
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      console.error(error);
      return rejected(error);
    }
  });
}

module.exports = {
  query,
  insert,
  update,
  deleteV1,
};
