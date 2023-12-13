const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getLocations(req, res) {
  try {
    const sql = `SELECT id, name FROM locations`;
    const locations = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: locations }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
