const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query } = require("../../../services/db.service");

module.exports = async function getColors(req, res) {
  try {
    const company_id = 0;
    const sql = `
      SELECT 
              id, 
              name AS colorName, 
              sq AS albanianName, 
              en AS englishName, 
              tr AS turkishName 
      FROM    
              colors 
      WHERE 
              company_id = ?`;
    const colors = await query({
      sql,
      params: [company_id],
      connection: dbMain,
    });
    return successfulReturn({ data: colors }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
