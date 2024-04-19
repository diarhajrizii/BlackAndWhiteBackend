const { successfulReturn, errorReturn } = require("../../utils/response");
const { query } = require("../../services/db.service");

module.exports = async function updateTransaction(req, res) {
  try {
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
