const { successfulReturn, errorReturn } = require("../../../utils/response");
const { deletev2 } = require("../../../services/db.service");

module.exports = async function deleteLocation(req, res) {
  try {
    const { id } = req.body;
    const company_id = 0;

    await deletev2({
      query: "DELETE FROM locations WHERE id = ? AND company_id = ?",
      query_values: [id, company_id],
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Location has deleted successfully" },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
