const { successfulReturn, errorReturn } = require("../../../utils/response");
const { deletev2 } = require("../../../services/db.service");

module.exports = async function deleteNumber(req, res) {
  try {
    const { id } = req.body; // Assuming number is sent in the request body
    const company_id = 0;
    // Perform validation checks on number if necessary

    await deletev2({
      query: "DELETE FROM numbers WHERE id = ? AND company_id = ?",
      query_values: [id, company_id],
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Number has deleted successfully" },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
