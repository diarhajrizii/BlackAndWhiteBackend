const { query } = require("../../services/db.service");
const { successfulReturn, errorReturn } = require("../../utils/response");

module.exports = async function getProducts(req, res) {
  try {
    const type = req.query.type;
    const groupByFilter = type === "sales" ? `GROUP BY P.barcode` : ``;
    const soldFilter = type === "sold" ? "p.sold = 1" : "p.sold = 0";
    const company_id = 0;
    const quantityFilter =
      type === "sales"
        ? `COALESCE(MAX(P.quantity), (SELECT COUNT(*) FROM products P2 WHERE P2.barcode = P.barcode AND sold = 0)) AS quantity,`
        : ``;
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
          ${quantityFilter}
          C.name AS color,
          PT.name AS specific_type,
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
      WHERE 
          P.company_id = ?
      AND 
          p.sold = 0 
      AND 
          p.deleted = 0
      AND 
          (P.type <> "accessories" OR P.quantity <> 0)
      ${groupByFilter};
    `;

    const products = await query({
      sql,
      params: [company_id],
      connection: dbMain,
    });
    return successfulReturn({ data: products }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
