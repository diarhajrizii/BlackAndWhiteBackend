const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insertv2 } = require("../../../services/db.service");

module.exports = async function addType(req, res) {
  try {
    const { name } = req.body; // Assuming number is sent in the request body

    // Perform validation checks on number if necessary

    await insertv2({
      table: "product_type",
      params: { name },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Product-Type added successfully" },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
