// controllers/administration/articles.js

const { successfulReturn, errorReturn } = require("../../utils/response");
const { query } = require("../../services/db.service");

module.exports = async function getArticles(req, res) {
  try {
    const { type } = req.query;
    const { company_id } = req.user;
    const columns =
      type === "articles" ? "article_id, name, quantity" : " name, quantity";
    const { data: articles } = await query({
      sql: `SELECT id, ${columns} FROM administration_articles WHERE company_id = ?;`,
      params: [company_id],
      connection: dbMain,
    });
    return successfulReturn(
      { message: "Articles retrieved successfully", data: articles },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
