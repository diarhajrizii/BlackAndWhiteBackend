const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insert } = require("../../../services/db.service");

module.exports = async function addNumber(req, res) {
  try {
    const { number, type } = req.body; // Assuming number is sent in the request body
    const { company_id } = req.user;
    // Perform validation checks on number if necessary

    // TODO check type also in front
    const insertID = await insert({
      table_name: "numbers",
      params: { number, type: type || "shoes", company_id },
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
