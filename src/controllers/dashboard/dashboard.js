const { query } = require("../../services/db.service");
const { successfulReturn, errorReturn } = require("../../utils/response");
module.exports = async function sportType(req, res) {
  try {
    const data = await query({
      connection: dbMain,
      sql: "SELECT * FROM companies",
      params: [],
    });
    return successfulReturn({ data: data }, res);
  } catch (e) {
    console.log(e);
    return errorReturn({ e, res });
  }
};
