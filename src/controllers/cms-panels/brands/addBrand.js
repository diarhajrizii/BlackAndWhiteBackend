const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insert } = require("../../../services/db.service");

module.exports = async function addBrand(req, res) {
  try {
    const { brandName, produced } = req.body;
    const params = { name: brandName, produced };

    const insertID = await insert({
      table_name: "brands",
      params,
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Brand added successfully", data: insertID },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
