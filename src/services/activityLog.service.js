const { getCurrentDateTime } = require("../utils/helper.util");
const { insert } = require("./db.service");

async function activityLog({ user_id, type, value, description }) {
  user_id = user_id || 0;
  if (!type) throw { message: "Type is required" };
  if (!description) throw { message: "Description is required" };

  const createdAt = getCurrentDateTime();

  let params = {};
  params.createdAt = createdAt;
  params.user_id = user_id;
  params.type = type;
  if (value) params.value = value;
  params.description = description;

  await insert({
    table_name: "cms_users_activity",
    params,
    connection: dbCMS,
  });
  return true;
}

module.exports = {
  activityLog,
};
