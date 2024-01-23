const { fetchYearlyTotalSales } = require("../../utils/helper.util");
const { successfulReturn, errorReturn } = require("../../utils/response");

module.exports = async function getYearsSalesTransactions(req, res) {
  try {
    const currentYear = new Date().getFullYear();
    const [
      totalSalesArray2023,
      totalSalesArray2022,
      totalSalesArray2021,
      totalSalesArray2020,
    ] = await Promise.all([
      fetchYearlyTotalSales(currentYear - 1),
      fetchYearlyTotalSales(currentYear - 2),
      fetchYearlyTotalSales(currentYear - 3),
      fetchYearlyTotalSales(currentYear - 4),
    ]);

    return successfulReturn(
      {
        data: {
          totalSalesArray2023,
          totalSalesArray2022,
          totalSalesArray2021,
          totalSalesArray2020,
        },
      },
      res
    );
  } catch (error) {
    console.error(error);
    return errorReturn({ error, res });
  }
};
