const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getTypes(req, res) {
  try {
    const { type } = req.query;
    const filterQuery = type ? `WHERE type = "${type}"` : "";

    const sql = `
      SELECT 
                id, name AS specificType, type 
      FROM      product_specific_types
      ${filterQuery}
      ORDER BY  type ASC, name ASC
      `;
    const types = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: types }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
