const { successfulReturn, errorReturn } = require("../../utils/response");
const { executeMultiQuery } = require("../../configs/dbConnection");

module.exports = async function returnAndPurchase(req, res) {
  try {
    const { returnData, purchaseData } = req.body;

    const queries = [];
    const values = [];

    // Handle return of the original product
    returnData.forEach((returnItem) => {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const insertReturnQuery = `
        INSERT INTO transactions (type, product_id, date, payment_type, bank_name, discount_price, price, transaction_type, product_type, sale_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const discountPrice =
        Number(returnItem.original_regular_price) -
        Number(returnItem.original_price);

      const insertReturnValue = [
        "return",
        returnItem.product_id,
        currentDate,
        returnItem.paymentType,
        returnItem.bank,
        discountPrice,
        returnItem.original_price,
        "outcome",
        returnItem.product_type,
        returnItem.sale_type,
      ];

      queries.push(insertReturnQuery);
      values.push(insertReturnValue);

      const updateReturnQuery = `
        UPDATE products
        SET
          sold = 0
          ${
            returnItem.product_type === "accessories"
              ? ", quantity = quantity + 1"
              : ""
          }
        WHERE id = ?;
      `;

      const updateReturnValue = [returnItem.product_id];

      queries.push(updateReturnQuery);
      values.push(updateReturnValue);
    });

    // Handle purchase of the new product
    purchaseData.forEach((purchaseItem) => {
      const insertPurchaseQuery = `
        INSERT INTO transactions (type, product_id, date, payment_type, bank_name, discount_price, price, transaction_type, product_type, sale_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const discountPrice =
        Number(purchaseItem.regular_price) - Number(purchaseItem.price);
      const insertPurchaseValue = [
        "sale",
        purchaseItem.id,
        currentDate,
        purchaseItem.paymentType,
        purchaseItem.bank,
        discountPrice,
        purchaseItem.price,
        "income",
        purchaseItem.type,
        purchaseItem.sale_type,
      ];

      queries.push(insertPurchaseQuery);
      values.push(insertPurchaseValue);

      const updatePurchaseQuery = `
        UPDATE products
        SET
          sold = 1
          ${
            returnItem.product_type === "accessories"
              ? ", quantity = quantity - 1"
              : ""
          }
        WHERE id = ?;
      `;

      const updatePurchaseValue = [purchaseItem.id];

      queries.push(updatePurchaseQuery);
      values.push(updatePurchaseValue);
    });

    await executeMultiQuery({ queries, values, useTransaction: true });

    return successfulReturn(
      { message: "Return and purchase processed successfully" },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
