const { successfulReturn, errorReturn } = require("../../../utils/response");
const { deletev2 } = require("../../../services/db.service");

module.exports = async function deleteType(req, res) {
  try {
    const { id } = req.body;
    await deletev2({
      query: "DELETE FROM product_specific_types WHERE id = ?",
      query_values: [id],
      connection: dbMain,
    });

    return successfulReturn({ message: "Type has deleted successfully" }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
