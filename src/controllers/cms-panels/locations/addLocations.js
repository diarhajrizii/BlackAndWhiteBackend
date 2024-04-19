const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insert } = require("../../../services/db.service");

module.exports = async function addLocation(req, res) {
  try {
    const { name } = req.body;
    const company_id = 0;
    const insertID = await insert({
      table_name: "locations",
      params: { name, company_id },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Location added successfully", data: insertID },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
