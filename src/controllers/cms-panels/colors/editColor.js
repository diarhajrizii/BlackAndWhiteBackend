const { successfulReturn, errorReturn } = require("../../../utils/response");
const { updateV2 } = require("../../../services/db.service");

module.exports = async function editColor(req, res) {
  try {
    console.log(req.body);
    const { id, colorName, albanianName, englishName, turkishName } = req.body;

    const params = {
      name: colorName,
      sq: albanianName,
      en: englishName,
      tr: turkishName,
    };

    await updateV2({
      table_name: "colors",
      params,
      where: { id },
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
