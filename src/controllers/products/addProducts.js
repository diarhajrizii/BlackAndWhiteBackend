const addProductsModel = require("../../models/products/addProducts.model");
const { successfulReturn, errorReturn } = require("../../utils/response");
const { executeMultiQuery } = require("../../configs/dbConnection");

module.exports = async function addProducts(req, res) {
  try {
    const { code, brand, type, color, stockPrice, importPrice, sizes } =
      req.body;
    const queries = [];
    const values = [];

    let productsQuantity = 0;
    for (const sizeObj of sizes) {
      const { size, quantity } = sizeObj;
      productsQuantity += quantity;
      for (let i = 0; i < quantity; i++) {
        const insertProductQuery = `
          INSERT INTO products (code, brand_id, type_id, color_id, price, import_price, number)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        queries.push(insertProductQuery);
        values.push([code, brand, type, color, stockPrice, importPrice, size]);
      }
    }

    if (!productsQuantity)
      throw { message: "Please select quantity of numbers" };

    const result = await executeMultiQuery({
      queries,
      values,
      dbType: dbMain, // Replace with your actual database type
    });

    return successfulReturn({ data: addProductsModel({ data: result }) }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
