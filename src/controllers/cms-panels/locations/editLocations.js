const { successfulReturn, errorReturn } = require("../../../utils/response");
const { update } = require("../../../services/db.service");

module.exports = async function editLocation(req, res) {
  try {
    const { id, name } = req.body;
    const params = { name };
    await update({
      table_name: "locations",
      params,
      where: { id },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Location edited successfully", data: [] },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
