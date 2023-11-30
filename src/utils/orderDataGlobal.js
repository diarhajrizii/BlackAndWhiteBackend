const { query } = require("../services/db.service");

async function orderDataGlobal(data, parameters) {
  try {
    // Destructure the parameters object
    const { table, column, where, dbTransaction = dbMain } = parameters;

    // Check if data is missing or empty
    if (!data || data.length === 0) {
      throw { message: "data is missing" };
    }

    // Check if one of parameters is missing
    if (!table) throw { message: "table parameter is missing" };
    if (!column) throw { message: "column parameter is missing" };
    if (!where) throw { message: "where parameter is missing" };
    let query = "";
    const params = [];
    for (let i = 0; i < data.length; i++) {
      // Destructure the data item and retrieve the value of 'order' and the dynamic column specified by 'where'
      const { order, [where]: columnValue } = data[i];

      // Construct the SQL update query dynamically
      query += `UPDATE ${table} SET ${column} = ? WHERE ${where} = ?; `;

      // Add the parameters for the query
      params.push(order + 1, columnValue);
    }

    // Execute the update query with the parameters
    await dbTransaction.promise().query(query, params);
    // Return a success status
    return { status: true };
  } catch (error) {
    // Return an error status and message
    return { status: false, message: error.message };
  }
}
async function getNextOrderNumber({
  sql,
  connection = dbMain,
  params = [],
  column = "order_nr",
}) {
  let order = 0;
  const { data } = await query({
    sql,
    connection,
    params,
  });
  if (data && data.length > 0) {
    order = data[0][column];
  }
  return order + 1;
}
module.exports = {
  orderDataGlobal,
  getNextOrderNumber,
};
