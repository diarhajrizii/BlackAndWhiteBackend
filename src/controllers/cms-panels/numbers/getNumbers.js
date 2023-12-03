const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getNumbers(req, res) {
  try {
    const sql = `SELECT * FROM numbers`;
    const numbers = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: numbers }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
