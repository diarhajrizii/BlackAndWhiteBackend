const { query } = require("../services/db.service");
module.exports = async function getUserDataWithSubID(sub_id) {
  try {
    const {
      data: [userData],
    } = await query({
      connection: dbMain,
      sql: "SELECT * FROM users WHERE sub_id = ?;",
      params: [sub_id],
    });

    if (!userData) throw new Error("User doesn't exist!");
    return userData;
  } catch (error) {
    throw new Error(error);
  }
};
