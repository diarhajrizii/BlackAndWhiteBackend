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
      name, // For accessories
      quantity, // For accessories
    } = req.body;

    const { company_id } = req.user;

    const queries = [];
    const values = [];
    let totalQuantity = 0;

    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertProduct = (productData) => {
      const query = `
        INSERT INTO products (
          code, brand_id, type_id, color_id, price, import_price,
          number, barcode, date, type, location_id, name, quantity, company_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, 1, ?, ?, ?)
      `;
      queries.push(query);
      values.push(productData);
    };

    const insertTransaction = () => {
      const query = `
        INSERT INTO transactions (
          type, product_id, date, price, transaction_type, product_type, company_id
        ) VALUES (?, LAST_INSERT_ID(), ?, ?, ?, ?, ?)
      `;
      values.push([
        "buy",
        now,
        importPrice,
        "outcome",
        productType,
        company_id,
      ]);
      queries.push(query);
    };

    if (productType === "accessories") {
      const barcode = `${code}-${brand}-${name}`;
      const productData = [
        code,
        brand,
        type,
        color,
        stockPrice,
        importPrice,
        0, // No size
        barcode,
        productType,
        name,
        quantity,
        company_id,
      ];
      insertProduct(productData);
      totalQuantity += quantity;
    } else {
      for (const { size, quantity: sizeQty } of sizes) {
        totalQuantity += sizeQty;
        for (let i = 0; i < sizeQty; i++) {
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
            null, // name
            null, // quantity
            company_id,
          ];
          insertProduct(productData);
          insertTransaction();
        }
      }
    }

    if (!totalQuantity) {
      throw new Error("Please select a quantity of numbers");
    }

    const result = await executeMultiQuery({
      queries,
      values,
      dbType: dbMain, // Ensure dbMain is defined in scope
      useTransaction: true, // Atomic operation
    });

    return successfulReturn({ data: addProductsModel({ data: result }) }, res);
  } catch (error) {
    console.error("Error in addProducts:", error);
    return errorReturn({ e: error, res });
  }
};
