const { query } = require("../../services/db.service");
module.exports = async function sportType(req, res) {
  try {
    const data = await query({
      connection: dbMain,
      sql: "SELECT * FROM companies",
      params: [],
    });
    console.log(data);
    return res.status(400).json({ data });
  } catch (e) {
    return e;
  }
};
