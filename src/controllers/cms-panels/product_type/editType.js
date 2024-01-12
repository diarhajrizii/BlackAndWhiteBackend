const { successfulReturn, errorReturn } = require("../../../utils/response");
const { update } = require("../../../services/db.service");

module.exports = async function editType(req, res) {
  try {
    console.log(req.body);
    const { id, type } = req.body;
    const params = { name: type };

    await update({
      table_name: "product_type",
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
