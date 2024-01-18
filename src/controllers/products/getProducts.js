const { query } = require("../../services/db.service");
const { successfulReturn, errorReturn } = require("../../utils/response");

module.exports = async function getProducts(req, res) {
  try {
    const sql = `
        SELECT      P.*,
                    C.name AS color, 
                    PT.name AS type,
                    B.name AS brand,
                    B.produced
        FROM        products P
        LEFT JOIN colors C
        ON P.color_id = C.id
        LEFT JOIN product_specific_types PT
        ON P.type_id = PT.id
        LEFT JOIN brands B
        ON P.brand_id = B.id
    `;
    const products = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: products }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
