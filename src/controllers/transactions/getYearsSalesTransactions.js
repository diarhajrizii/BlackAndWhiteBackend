const { fetchYearlyTotalSales } = require("../../utils/helper.util");
const { successfulReturn, errorReturn } = require("../../utils/response");

module.exports = async function getYearsSalesTransactions(req, res) {
  try {
    const { years, type } = req.body;

    if (!years || !Array.isArray(years)) {
      return errorReturn({
        error: "Invalid or missing 'years' array in the request body",
        res,
      });
    }

    const yearlyTotalSales = await Promise.all(
      years.map(async (year) => {
        try {
          const salesArray = await fetchYearlyTotalSales(year, type);

          const totalSales = salesArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );

          return { year, salesArray, totalSales };
        } catch (error) {
          console.error(`Error fetching sales for ${year}:`, error);
          return { year, salesArray: Array.from({ length: 12 }, () => 0) };
        }
      })
    );

    return successfulReturn({ data: yearlyTotalSales }, res);
  } catch (error) {
    console.error(error);
    return errorReturn({ error, res });
  }
};
