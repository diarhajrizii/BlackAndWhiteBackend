const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insertV2 } = require("../../../services/db.service");

module.exports = async function addType(req, res) {
  try {
    const { type } = req.body; // Assuming number is sent in the request body

    // Perform validation checks on number if necessary

    const insertID = await insertV2({
      table: "product_type",
      params: { name: type },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Product-Type added successfully", data: insertID },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
