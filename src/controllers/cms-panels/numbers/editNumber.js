const { successfulReturn, errorReturn } = require("../../../utils/response");
const { update } = require("../../../services/db.service");

module.exports = async function editNumber(req, res) {
  try {
    const { id, number, type } = req.body;
    const company_id = 0;

    const params = { number, type };
    await update({
      table_name: "numbers",
      params,
      where: { id, company_id },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Number edited successfully", data: [] },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
