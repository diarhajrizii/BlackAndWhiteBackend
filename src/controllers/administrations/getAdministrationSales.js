const { successfulReturn, errorReturn } = require("../../utils/response");
const { query } = require("../../services/db.service");

module.exports = async function getAdministrationSales(req, res) {
  try {
    const saleQuery = `
      SELECT 
          S.id, AA.name, S.selling_price, DATE_FORMAT(S.sale_date, '%d-%m-%Y %H:%i:%s') as formatted_sale_date
      FROM
          administration_sales S
      LEFT JOIN 
          administration_articles AA
      ON  
        AA.id = S.article_id;`;

    const { data } = await query({
      sql: saleQuery,
      params: [],
      connection: dbMain,
    });
    console.log(data);
    return successfulReturn(
      { message: "Sale recorded successfully", data },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
