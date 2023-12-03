const { successfulReturn, errorReturn } = require("../../../utils/response");
const { query, insertv2 } = require("../../../services/db.service");

module.exports = async function addColor(req, res) {
  try {
    const { colorName, albanian, english, turkish } = req.body; // Assuming colorName, albanian, english, turkish are sent in the request body
    // Perform validation checks on colorName, albanian, english, turkish if necessary
    const params = { name: colorName, sq: albanian, en: english, tr: turkish };

    await insertv2({ table: "colors", params, connection: dbMain });

    return successfulReturn({ message: "Color added successfully" }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
