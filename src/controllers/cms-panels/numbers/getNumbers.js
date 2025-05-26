const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getNumbers(req, res) {
  try {
    const { type } = req.query;
    const filterQuery = type ? `AND type = "${type}"` : "";
    const company_id = 0;
    const sql = `
      SELECT 
                id, number, type 
      FROM      numbers
      WHERE company_id = ?
      ${filterQuery}
      -- ORDER BY  type DESC, number ASC
      `;
    const { data: numbers } = await query({
      sql,
      params: [company_id],
      connection: dbMain,
    });
    return successfulReturn({ data: numbers }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
