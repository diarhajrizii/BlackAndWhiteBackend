const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insertv2 } = require("../../../services/db.service");

module.exports = async function addNumber(req, res) {
  try {
    const { number } = req.body; // Assuming number is sent in the request body
    // Perform validation checks on number if necessary

    const insertID = await insertv2({
      table: "numbers",
      params: { number },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Number added successfully", data: insertID },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
