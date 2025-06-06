const { successfulReturn, errorReturn } = require("../../../utils/response");
const { update } = require("../../../services/db.service");

module.exports = async function editColor(req, res) {
  try {
    const { id, colorName, albanianName, englishName, turkishName } = req.body;
    const company_id = 0;
    const params = {
      name: colorName,
      sq: albanianName,
      en: englishName,
      tr: turkishName,
    };

    await update({
      table_name: "colors",
      params,
      where: { id, company_id },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Color edited successfully", data: [] },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
