const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insert } = require("../../../services/db.service");

module.exports = async function addColor(req, res) {
  try {
    const { colorName, albanianName, englishName, turkishName } = req.body; // Assuming colorName, albanian, english, turkish are sent in the request body
    const company_id = 0;

    const params = {
      name: colorName,
      sq: albanianName,
      en: englishName,
      tr: turkishName,
      company_id,
    };

    const insertID = await insert({
      table_name: "colors",
      params,
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Color added successfully", data: insertID },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
