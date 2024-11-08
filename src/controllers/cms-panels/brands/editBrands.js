const { successfulReturn, errorReturn } = require("../../../utils/response");
const { update } = require("../../../services/db.service");

module.exports = async function editBrands(req, res) {
  try {
    const { id, brandName, produced, type } = req.body;
    const params = { name: brandName, produced, type };
    const company_id = 0;
    await update({
      table_name: "brands",
      params,
      where: { id, company_id },
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
