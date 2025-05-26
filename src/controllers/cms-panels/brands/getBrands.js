const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getBrands(req, res) {
  const { type } = req.query;

  const { company_id } = req.user;

  const filterQuery = type ? `AND type = "${type}"` : "";
  try {
    const sql = `
      SELECT 
                id, name AS brandName, produced, type 
      FROM      brands
      WHERE company_id = ?
      ${filterQuery}
      -- ORDER BY  type ASC, name DESC
    `;
    const { data: brands } = await query({
      sql,
      params: [company_id],
      connection: dbMain,
    });

    return successfulReturn({ data: brands }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
``;
