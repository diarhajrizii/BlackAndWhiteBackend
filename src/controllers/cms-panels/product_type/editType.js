const { successfulReturn, errorReturn } = require("../../../utils/response");
const { update } = require("../../../services/db.service");

module.exports = async function editType(req, res) {
  try {
    const { id, type, specificType } = req.body;

    const params = { name: specificType, type };

    await update({
      table_name: "product_specific_types",
      params,
      where: { id },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Type edited successfully", data: [] },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
