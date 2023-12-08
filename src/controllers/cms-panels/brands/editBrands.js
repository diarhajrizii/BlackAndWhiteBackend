const { successfulReturn, errorReturn } = require("../../../utils/response");
const { updateV2 } = require("../../../services/db.service");

module.exports = async function editBrands(req, res) {
  try {
    const { id, brandName, produced } = req.body;
    const params = { name: brandName, produced };
    await updateV2({
      table_name: "brands",
      params,
      where: { id },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Brand edited successfully", data: [] },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};