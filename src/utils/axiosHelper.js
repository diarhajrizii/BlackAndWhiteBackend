var $this;
module.exports = {
  async asyncQuery({ query, params }, dbTransaction = false) {
    try {
      params = params || [];
      let db_obj = dbTransaction || dbCMS;
      const result = await db_obj.execute(query, params);
      return result[0];
    } catch (error) {
      console.log(error);
      return { status: false, message: error.message };
    }
  },
  async insert({ table_name, params }, dbTransaction = false) {
    try {
      let query = `INSERT INTO ${table_name} (`;
      let query_params = [];
      let keys = Object.keys(params);
      let questionMarks = "";
      for (let i = 0; i < keys.length; i++) {
        const key_name = keys[i];
        query_params.push(params[key_name]);
        questionMarks += "?";
        query += key_name;
        if (i + 1 != keys.length) {
          query += ",";
          questionMarks += ",";
        }
      }
      let db_obj = dbTransaction || dbCMS;
      query += `) VALUE (${questionMarks});`;
      const result = await db_obj.execute(query, query_params);
      return result[0];
    } catch (error) {
      console.log(error);
      return { status: false, message: error.message };
    }
  },

  async update(
    { table_name, params, where },
    dbTransaction = false,
    type = "regular"
  ) {
    return new Promise(async function (resolve, reject) {
      try {
        let query = `UPDATE \`${table_name}\` SET `;

        // UPDATE COLUMNS
        let keys = Object.keys(params);
        let query_params = [];
        for (let i = 0; i < keys.length; i++) {
          const key_name = keys[i];
          query += `${key_name} = ?`;
          query_params.push(params[key_name]);
          if (i + 1 != keys.length) {
            query += `, `;
          }
        }

        // WHERE
        query += " WHERE ";
        let whereKeys = Object.keys(where);
        for (let i = 0; i < whereKeys.length; i++) {
          const element = whereKeys[i];
          query += `${element} = ?`;
          query_params.push(where[element]);
          if (i + 1 != whereKeys.length) {
            query += ` AND `;
          }
        }

        // EXECUTE
        let db_obj = dbTransaction || dbCMS;
        if (type == "regular") {
          db_obj.query(query, query_params, (err, result) => {
            if (err) {
              console.log(err);
              return reject({ status: false, message: err.message });
            } else {
              return resolve(result);
            }
          });
        } else {
          const result = await db_obj.execute(query, query_params);
          return resolve({ status: true, result });
        }
      } catch (error) {
        console.log(error);
        return reject({ status: false, message: error.message });
      }
    });
  },

  async deleteQuery({ table_name, params }, dbTransaction = false) {
    return new Promise(async function (resolve, reject) {
      try {
        let keys = Object.keys(params);
        let query_params = [];
        let query = `DELETE FROM ${table_name} WHERE `;
        for (let i = 0; i < keys.length; i++) {
          const key_name = keys[i];
          query += `${key_name} = ?`;
          query_params.push(params[key_name]);
          if (i + 1 != keys.length) {
            query += ` AND `;
          }
        }
        query += `;`;
        let db_obj = dbTransaction || dbCMS;
        db_obj.query(query, query_params, (err, result) => {
          if (err) {
            return resolve({ status: false, message: err.message });
          } else {
            return resolve(result);
          }
        });
      } catch (error) {
        return resolve({ status: false, message: error.message });
      }
    });
  },
};
