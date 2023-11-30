const { insert } = require("./db.service");
const { getCurrentDateTimeDatabase } = require("../utils/helper.util");

async function insertUserAuditDetails(userId, field, oldValue, newValue ) {
  try {
    const now = getCurrentDateTimeDatabase();
    const logiD = await insert({
      connection: dbCMS,
      query: `INSERT INTO swiftyglobal_analytics.user_audit_log (user_id, created_at, description) VALUES (?, ?, ?)`,
      query_values: [userId, now, "Account Updated"],
    });

    await insert({
      connection: dbCMS,
      query: `INSERT INTO swiftyglobal_analytics.user_audit_log_details (log_id, field, previus_value, new_value) VALUES (?, ?, ?, ?)`,
      query_values: [logiD.data.insertId, field, oldValue, newValue],
    });
  } catch (e) {
    console.log(e);
    return { status: false, message: e.message };
  }
}

module.exports = {
  insertUserAuditDetails
};
