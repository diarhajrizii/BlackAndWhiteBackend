const { successfulReturn, errorReturn } = require("../../utils/response");
const { insert } = require("../../services/db.service");

module.exports = async function addTransaction(req, res) {
  try {
    const { payment_type, description, subType, transaction_type, sale_price } =
      req.body;
    const { company_id } = req.user;
    const insertID = await insert({
      table_name: "transactions",
      params: {
        type: subType,
        payment_type,
        bank_name: "",
        price: sale_price,
        transaction_type,
        sale_type: "",
        company_id,
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
