const { query } = require("../../services/db.service");
const { successfulReturn, errorReturn } = require("../../utils/response");

module.exports = async function getProducts(req, res) {
  try {
    const sql = `
      SELECT
          P.id,
          P.barcode,
          P.code,
          P.brand_id,
          P.type_id,
          P.color_id,
          P.price,
          P.import_price,
          P.number,
          P.date,
          P.type,
          P.location_id,
          COUNT(P.barcode) AS quantity,
          C.name AS color,
          PT.name AS type,
          B.name AS brand,
          B.produced,
          L.name AS location
      FROM
          products P
      LEFT JOIN
          colors C ON P.color_id = C.id
      LEFT JOIN
          product_specific_types PT ON P.type_id = PT.id
      LEFT JOIN
          brands B ON P.brand_id = B.id
      LEFT JOIN 
          locations L ON P.location_id = L.id
      GROUP BY
          P.barcode;

    `;
    const products = await query({ sql, params: [], connection: dbMain });
    return successfulReturn({ data: products }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
