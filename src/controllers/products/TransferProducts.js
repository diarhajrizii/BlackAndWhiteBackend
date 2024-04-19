const { successfulReturn, errorReturn } = require("../../utils/response");
const { executeMultiQuery } = require("../../configs/dbConnection");

module.exports = async function transferProducts(req, res) {
  try {
    const { ids, location } = req.body;

    const updateQueries = [];
    const updateValues = [];
    const company_id = 0;

    for (const id of ids) {
      const updateQuery = `
        UPDATE products 
        SET location_id = ?
        WHERE id = ?
        AND company_id = ?
      `;

      updateQueries.push(updateQuery);
      updateValues.push([location, id, company_id]);
    }

    await executeMultiQuery({
      queries: updateQueries,
      values: updateValues,
      useTransaction: true,
      dbType: dbMain,
      useTransaction: true,
    });

    return successfulReturn({ message: "Location updated successfully" }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
