const { successfulReturn, errorReturn } = require("../../utils/response");
const { insert } = require("../../services/db.service");

module.exports = async function addTransaction(req, res) {
  try {
    console.log(req.body);
    return false;
    const { payment_type, description, subType, transaction_type } = req.body;
    const company_id = 0;

    const insertID = await insert({
      table_name: "transaction",
      params: {
        type: "",
        date: "",
        payment_type,
        bank_name: "",
        price: "",
        transaction_type: "",
        sale_type: "",
        company_id,
        transaction_type_id: "",
        description,
      },
      connection: dbMain,
    });

    return successfulReturn(
      {
        message: "New transaction has been added successfully",
        data: insertID,
      },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ e: error, res });
  }
};
