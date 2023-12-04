const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getBrands(req, res) {
  try {
    const sql = `SELECT id, name AS brandName, produced FROM brands`;
    const brands = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: brands }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
