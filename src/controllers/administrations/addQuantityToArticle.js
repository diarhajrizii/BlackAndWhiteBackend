const { successfulReturn, errorReturn } = require("../../utils/response");
const { query } = require("../../services/db.service");

module.exports = async function addQuantityToArticle(req, res) {
  try {
    const { article_id, added_quantity } = req.body;

    const { data: updateResult } = await query({
      sql: `UPDATE administration_articles SET quantity = quantity + ? WHERE id = ?`,
      params: [added_quantity, article_id],
      connection: dbMain,
    });

    if (updateResult.affectedRows > 0) {
      return successfulReturn(
        { message: "Quantity added to article successfully" },
        res
      );
    } else {
      return errorReturn({
        e: "Failed to update quantity for the article",
        res,
      });
    }
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
