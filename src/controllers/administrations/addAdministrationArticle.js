const { successfulReturn, errorReturn } = require("../../utils/response");
const { insert } = require("../../services/db.service");

module.exports = async function addArticle(req, res) {
  insert;
  try {
    const { name, administrationNumber } = req.body;

    const insertID = await insert({
      table_name: "administration_articles",
      params: {
        name,
        article_id: administrationNumber,
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
