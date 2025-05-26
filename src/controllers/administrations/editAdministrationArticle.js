const { successfulReturn, errorReturn } = require("../../utils/response");
const { query } = require("../../services/db.service");

module.exports = async function editAdministrationArticles(req, res) {
  try {
    const { id } = req.params;
    const { name, article_id } = req.body;
    const company_id = 0;

    // Validate Parameters
    if (!name) throw { message: "Name is missing!" };
    if (!article_id) throw { message: "Administration Number is missing!" };
    if (!article_id) throw { message: "Article ID is missing!" };

    const { data: updateResult } = await query({
      sql: `
        UPDATE administration_articles
        SET name = ?, article_id = ?
        WHERE id = ?
        AND company_id = ?
      `,
      params: [name, article_id, id, company_id],
      connection: dbMain,
    });
    if (updateResult.affectedRows > 0) {
      return successfulReturn({ message: "Article updated successfully" }, res);
    } else {
      return errorReturn({
        e: "Failed to update the article",
        res,
      });
    }
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
