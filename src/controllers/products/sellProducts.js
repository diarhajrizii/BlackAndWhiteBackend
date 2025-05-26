const { successfulReturn, errorReturn } = require("../../utils/response");
const { executeMultiQuery } = require("../../configs/dbConnection");

module.exports = async function sellProducts(req, res) {
  try {
    const salesData = req.body;
    const { company_id } = req.user;
    const queries = [];
    const values = [];
    salesData.forEach((sale) => {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const insertQuery = `
        INSERT INTO transactions (type, product_id, date, payment_type, bank_name, discount_price, price, transaction_type, product_type, sale_type, company_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const discountPrice = Number(sale.regular_price) - Number(sale.price);
      const insertValue = [
        "sale",
        sale.id,
        currentDate,
        sale.paymentType,
        sale.bank,
        discountPrice,
        sale.price,
        "income",
        sale.type,
        sale.sale_type,
        company_id,
      ];

      queries.push(insertQuery);
      values.push(insertValue);

      const updateQuery = `
        UPDATE products
        SET
          sold = CASE
                    WHEN type = 'accessories' THEN 0
                    ELSE 1
                  END,
          quantity = CASE
                      WHEN type = 'accessories' THEN quantity - 1
                      ELSE quantity
                    END,
          transaction_id = LAST_INSERT_ID()
        WHERE id = ?
        AND company_id = ?;
      
      `;

      const updateValue = [sale.id, company_id];

      queries.push(updateQuery);
      values.push(updateValue);
    });

    await executeMultiQuery({ queries, values, useTransaction: true });

    return successfulReturn(
      { message: "Sales data inserted successfully" },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
