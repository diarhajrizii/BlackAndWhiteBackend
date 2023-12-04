const { successfulReturn, errorReturn } = require("../../../utils/response");
const { updateV2 } = require("../../../services/db.service");

module.exports = async function editNumber(req, res) {
  try {
    const { id, number } = req.body;
    const params = { number };
    await updateV2({
      table_name: "numbers",
      params,
      where: { id },
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
