const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getLocations(req, res) {
  try {
    const company_id = 0;
    const sql = `
      SELECT  id, name 
      FROM    locations
      WHERE   company_id = ?; 
    `;
    const locations = await query({
      sql,
      params: [company_id],
      connection: dbMain,
    });
    return successfulReturn({ data: locations }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
