const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getNumbers(req, res) {
  try {
    const { type } = req.query;
    const filterQuery = type ? `WHERE type = "${type}"` : "";
    const sql = `
      SELECT 
                id, number, type 
      FROM      numbers
      ${filterQuery}
      ORDER BY  type DESC, number ASC
      `;
    const numbers = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: numbers }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
