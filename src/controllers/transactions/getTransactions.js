const { query } = require("../../services/db.service");
const { successfulReturn, errorReturn } = require("../../utils/response");

module.exports = async function getTransactions(req, res) {
  try {
    const sql = `
      SELECT 
        T.type, 
        T.transaction_type, 
        T.price AS sale_price , 
        T.product_id, 
        T.payment_type, 
        T.id, 
        T.discount_price, 
        T.date, 
        T.bank_name, 
        T.cancel_date,

        P.id AS product_id,
        P.code,
        P.number,
        P.exported_country,
        P.price AS product_price,
        P.import_price,
        P.date AS product_date,
        P.barcode,
        P.saled,
        P.transaction_id AS product_transaction_id,

        C.name AS color_name, 
        B.name AS brand_name,
        PT.name AS product_type 

      FROM transactions T
      LEFT JOIN products P ON T.product_id = P.id
      LEFT JOIN colors C ON P.color_id = C.id
      LEFT JOIN brands B ON P.brand_id = B.id
      LEFT JOIN product_type PT ON P.type_id = PT.id
    `;

    const transactions = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: transactions }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
