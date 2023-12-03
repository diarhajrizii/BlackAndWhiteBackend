const { successfulReturn, errorReturn } = require("../../../utils/response");
const { insertv2 } = require("../../../services/db.service");

module.exports = async function addBrand(req, res) {
  try {
    const { brandName, produced } = req.body;
    const params = { name: brandName, produced };

    await insertv2({ table: "brands", params, connection: dbMain });

    return successfulReturn({ message: "Brand added successfully" }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
