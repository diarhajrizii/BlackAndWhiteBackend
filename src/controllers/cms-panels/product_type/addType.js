const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insert } = require("../../../services/db.service");

module.exports = async function addType(req, res) {
  try {
    const { specificType, type } = req.body; // Assuming number is sent in the request body
    const company_id = 0;
    // Perform validation checks on number if necessary

    // TODO check type also in front
    const insertID = await insert({
      table_name: "product_specific_types",
      params: { name: specificType, type: type || "shoes", company_id },
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
