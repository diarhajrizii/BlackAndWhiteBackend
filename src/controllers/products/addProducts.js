const addProductsModel = require("../../models/products/addProducts.model");
const { successfulReturn, errorReturn } = require("../../utils/response");
const { executeMultiQuery } = require("../../configs/dbConnection");

module.exports = async function addProducts(req, res) {
  try {
    const {
      code,
      brand,
      type,
      color,
      stockPrice,
      importPrice,
      sizes,
      productType,
      name, // New property for accessories
      quantity, // New property for accessories
    } = req.body;

    const queries = [];
    const values = [];
    let productsQuantity = 0;

    if (productType === "accessories") {
      // Insert accessories with a single size
      const barcode = `${code}-${brand}-${name}`;
      const insertProductQuery = `
        INSERT INTO products (code, brand_id, type_id, color_id, price, import_price, number, barcode, date, type, location_id, name, quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 1, ?, ?)
      `;
      queries.push(insertProductQuery);
      values.push([
        code,
        brand,
        type,
        color,
        stockPrice,
        importPrice,
        0, // Single size for accessories
        barcode,
        productType,
        name,
        quantity,
      ]);

      productsQuantity += quantity;
    } else {
      // Insert sizes for shoes and textile
      for (const sizeObj of sizes) {
        const { size, quantity } = sizeObj;
        productsQuantity += quantity;
        for (let i = 0; i < quantity; i++) {
          const barcode = `${code}-${brand}-${size}-${color}`;
          const insertProductQuery = `
            INSERT INTO products (code, brand_id, type_id, color_id, price, import_price, number, barcode, date, type, location_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 1)
          `;
          queries.push(insertProductQuery);
          values.push([
            code,
            brand,
            type,
            color,
            stockPrice,
            importPrice,
            size,
            barcode,
            productType,
          ]);
          const currentDate = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          const insertQuery = `
            INSERT INTO transactions (type, product_id, date, price, transaction_type, product_type)
            VALUES (?, LAST_INSERT_ID(), ?, ?, ?, ?)
          `;
          const insertValue = [
            "buy",
            currentDate,
            importPrice,
            "outcome",
            productType,
          ];

          queries.push(insertQuery);
          values.push(insertValue);
        }
      }
    }

    if (!productsQuantity)
      throw { message: "Please select a quantity of numbers" };

    const result = await executeMultiQuery({
      queries,
      values,
      dbType: dbMain, // Replace with your actual database type
      useTransaction: true, // Use transactions for data consistency
    });

    return successfulReturn({ data: addProductsModel({ data: result }) }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
