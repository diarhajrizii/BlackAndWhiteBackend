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
    const { company_id } = req.user;

    const queries = [];
    const values = [];
    let productsQuantity = 0;

    // Helper function to insert product
    const insertProduct = (productData) => {
      const insertProductQuery = `
        INSERT INTO products (code, brand_id, type_id, color_id, price, import_price, number, barcode, date, type, location_id, name, quantity, company_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 1, ?, ?, ?)
      `;
      queries.push(insertProductQuery);
      values.push(productData);
    };

    // Helper function to insert transaction
    const insertTransaction = (productId) => {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const insertQuery = `
        INSERT INTO transactions (type, product_id, date, price, transaction_type, product_type, company_id)
        VALUES (?, LAST_INSERT_ID(), ?, ?, ?, ?, ?)
      `;
      const insertValue = [
        "buy",
        currentDate,
        importPrice,
        "outcome",
        productType,
        company_id,
      ];
      queries.push(insertQuery);
      values.push(insertValue);
    };

    // If product is an accessory
    if (productType === "accessories") {
      const barcode = `${code}-${brand}-${name}`;
      const productData = [
        code,
        brand,
        type,
        color,
        stockPrice,
        importPrice,
        0,
        barcode,
        productType,
        name,
        quantity,
        company_id,
      ];
      insertProduct(productData);
      productsQuantity += quantity;
    } else {
      // If product is not an accessory (e.g., shoes, textile)
      for (const sizeObj of sizes) {
        const { size, quantity: sizeQuantity } = sizeObj;
        productsQuantity += sizeQuantity;
        for (let i = 0; i < sizeQuantity; i++) {
          const barcode = `${code}-${brand}-${size}-${color}`;
          const productData = [
            code,
            brand,
            type,
            color,
            stockPrice,
            importPrice,
            size,
            barcode,
            productType,
            1,
            company_id,
          ];
          insertProduct(productData);
          insertTransaction();
        }
      }
    }

    if (!productsQuantity)
      throw { message: "Please select a quantity of numbers" };

    // Execute all queries within a transaction
    const result = await executeMultiQuery({
      queries,
      values,
      dbType: dbMain, // Replace with actual DB type
      useTransaction: true, // Ensures atomicity
    });

    return successfulReturn({ data: addProductsModel({ data: result }) }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
