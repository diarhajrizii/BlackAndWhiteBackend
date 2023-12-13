const { successfulReturn, errorReturn } = require("../../../utils/response");
const { deletev2 } = require("../../../services/db.service");

module.exports = async function deleteLocation(req, res) {
  try {
    const { id } = req.body;

    await deletev2({
      query: "DELETE FROM locations WHERE id = ?",
      query_values: [id],
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
