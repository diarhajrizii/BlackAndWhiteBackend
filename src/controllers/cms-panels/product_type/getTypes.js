const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getTypes(req, res) {
  try {
    const { type } = req.query;
    const company_id = 0;
    const filterQuery = type ? `AND type = "${type}"` : "";

    const sql = `
      SELECT 
                id, name AS specificType, type 
      FROM      product_specific_types
      WHERE company_id = ?
      ${filterQuery}
      -- ORDER BY  type ASC, name ASC
      `;
    const { data: types } = await query({
      sql,
      params: [company_id],
      connection: dbMain,
    });
    return successfulReturn({ data: types }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
