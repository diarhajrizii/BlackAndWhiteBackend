const { successfulReturn, errorReturn } = require("../../utils/response");
const { query, insert, update } = require("../../services/db.service");
const { getNewDate } = require("../../utils/helper.util");

module.exports = async function recordAdministrationSale(req, res) {
  try {
    // TODO DO THIS WITH TRANSACTIONS
    const { articleId, price: selling_price } = req.body;

    if (!articleId) throw { message: "Article ID is missing!" };
    if (!selling_price) throw { message: "Price is missing!" };

    const saleQuery = `
      UPDATE administration_articles 
      SET 
        quantity = quantity - 1, 
        sales_quantity = sales_quantity + 1, 
        total_sales = total_sales + ? 
      WHERE id = ?
    `;

    const { data: updateResult } = await query({
      sql: saleQuery,
      params: [selling_price, articleId],
      connection: dbMain,
    });

    if (!updateResult.affectedRows > 0) {
      throw { message: `Failed to record sale for the article` };
    }

    const createdAt = getNewDate();

    const saleInsertID = await insert({
      table_name: "administration_sales",
      params: { article_id: articleId, selling_price, sale_date: createdAt },
      connection: dbMain,
    });

    return successfulReturn(
      {
        message: "Sale recorded successfully",
        data: { saleInsertID, createdAt },
      },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
