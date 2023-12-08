const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query, insertv2 } = require("../../../services/db.service");

module.exports = async function addColor(req, res) {
  try {
    const { colorName, albanianName, englishName, turkishName } = req.body; // Assuming colorName, albanian, english, turkish are sent in the request body

    const params = {
      name: colorName,
      sq: albanianName,
      en: englishName,
      tr: turkishName,
    };

    const insertID = await insertv2({
      table: "colors",
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
