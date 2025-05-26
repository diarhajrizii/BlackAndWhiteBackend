const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insert } = require("../../../services/db.service");
const { validateParameters } = require("../../../utils/helper.util");

module.exports = async function addBrand(req, res) {
  try {
    const { brandName, produced, type } = req.body;
    validateParameters({ brandName, produced });

    const { company_id } = req.user;

    // TODO check type also in front
    const params = {
      name: brandName,
      produced,
      type: type || "shoes",
      company_id,
    };

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
