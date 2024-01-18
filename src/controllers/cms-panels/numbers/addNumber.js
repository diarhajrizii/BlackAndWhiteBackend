const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insert } = require("../../../services/db.service");

module.exports = async function addNumber(req, res) {
  try {
    const { number, type } = req.body; // Assuming number is sent in the request body
    // Perform validation checks on number if necessary

    const insertID = await insert({
      table_name: "numbers",
      params: { number, type },
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
