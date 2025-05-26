const { successfulReturn, errorReturn } = require("../../utils/response");
const { insert } = require("../../services/db.service");

module.exports = async function addArticle(req, res) {
  try {
    const { name, article_id } = req.body;
    const { company_id } = req.user;

    const insertID = await insert({
      table_name: "administration_articles",
      params: {
        name,
        article_id,
        company_id,
      },
      connection: dbMain,
    });

    return successfulReturn(
      { message: "Article added successfully", data: insertID },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
