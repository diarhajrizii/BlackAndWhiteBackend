const { query } = require("../../services/db.service");
const { successfulReturn, errorReturn } = require("../../utils/response");

module.exports = async function userData(req, res) {
  try {
    const { id: user_id, company_id } = req.user;

    if (!user_id) throw { message: "user_id parameter is missing!" };

    const sql = `
      SELECT        * 
      FROM          users U 
      LEFT JOIN     companies C
        ON          U.company_id = C.id
      WHERE         U.id = ?
      AND           U.company_id = ?;`;
    const {
      data: [user],
    } = await query({
      sql,
      params: [user_id, company_id],
      connection: dbMain,
    });

    if (!user) {
      throw { message: "User doesn't exist" };
    }
    return successfulReturn({ data: user }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
