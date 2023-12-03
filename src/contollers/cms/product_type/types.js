const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getTypes(req, res) {
  try {
    const sql = `SELECT * FROM product_type`;
    const types = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: types }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
