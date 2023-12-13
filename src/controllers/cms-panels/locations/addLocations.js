const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insertv2 } = require("../../../services/db.service");

module.exports = async function addLocation(req, res) {
  try {
    const { name } = req.body;

    const insertID = await insertv2({
      table: "locations",
      params: { name },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Location added successfully", data: insertID },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
