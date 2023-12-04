const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getColors(req, res) {
  try {
    const sql = `SELECT id, name AS colorName, sq AS albanianName, en AS englishName, tr AS turkishName FROM colors`;
    const colors = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: colors }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
