function getSQLQuery(queryCode, vars = "") {
  let query = "";
  for (let i = 0; i < queryCode.length; i++) {
    const code = queryCode[i] + "";
    const code_type = code.substring(0, 1);
    switch (code_type) {
      case "1":
        query += getSelectQuery(code, vars);
        break;
      case "2":
        query += getInsertQuery(code);
        break;
      case "3":
        query += getUpdateQuery(code);
        break;
      case "4":
        query += getDeleteQuery(code);
        break;
      case "9":
        query += getAnalyticsQuery(code);
        break;
      default:
        return false;
    }
  }
  return query;
}

const getSelectQuery = (code, vars = "") => {
  const queries = {
    // See Transactions Price for all Year
    1000: ` 
      SELECT
          Year,
          SUM(TotalSales) AS TotalSales
      FROM
          sys.MonthlySales
      WHERE
          Year = 2023
      GROUP BY
          Year;
        `,
    // This query gives prioritize to transactions table
    1001: `
        SELECT 
        MS.Month AS Month,
        COALESCE(T.TotalSales, MSales.TotalSales, 0) AS TotalSales
      FROM (
        SELECT '01' AS Month, 'January' AS FullMonth
        UNION 
        SELECT '02', 'February' UNION 
        SELECT '03', 'March' UNION 
        SELECT '04', 'April' UNION 
        SELECT '05', 'May' UNION 
        SELECT '06', 'June' UNION 
        SELECT '07', 'July' UNION 
        SELECT '08', 'August' UNION 
        SELECT '09', 'September' UNION 
        SELECT '10', 'October' UNION 
        SELECT '11', 'November' UNION 
        SELECT '12', 'December'
    ) MS
    LEFT JOIN (
        SELECT 
            DATE_FORMAT(date, '%m') AS Month,
            SUM(price) AS TotalSales
        FROM transactions
        WHERE YEAR(date) = ${vars}
            AND type = 'sale'
            AND transaction_type = 'income'
        GROUP BY Month
    ) T ON MS.Month = T.Month
    LEFT JOIN (
        SELECT 
            MONTH(STR_TO_DATE(Month, '%M')) AS Month,
            SUM(TotalSales) AS TotalSales
        FROM monthlySales
        WHERE Year = ${vars}
        GROUP BY Month
    ) MSales ON MS.Month = LPAD(MSales.Month, 2, '0') -- Pad with zero if necessary
    ORDER BY MS.Month;
    `,
    // This query gives prioritize to monthlySales table
    1002: `
      SELECT 
      MS.Month AS Month,
        COALESCE(MSales.TotalSales, T.TotalSales, 0) AS TotalSales
      FROM (
        SELECT '01' AS Month, 'January' AS FullMonth
        UNION 
        SELECT '02', 'February' UNION 
        SELECT '03', 'March' UNION 
        SELECT '04', 'April' UNION 
        SELECT '05', 'May' UNION 
        SELECT '06', 'June' UNION 
        SELECT '07', 'July' UNION 
        SELECT '08', 'August' UNION 
        SELECT '09', 'September' UNION 
        SELECT '10', 'October' UNION 
        SELECT '11', 'November' UNION 
        SELECT '12', 'December'
      ) MS
      LEFT JOIN (
        SELECT 
          DATE_FORMAT(date, '%m') AS Month,
          SUM(price) AS TotalSales
        FROM transactions
        WHERE YEAR(date) = ${vars}
          AND type = 'sale'
          AND transaction_type = 'income'
        GROUP BY Month
      ) T ON MS.Month = T.Month
      LEFT JOIN (
        SELECT 
          MONTH(STR_TO_DATE(Month, '%M')) AS Month,
          SUM(TotalSales) AS TotalSales
        FROM monthlySales
        WHERE Year = ${vars}
        GROUP BY Month
      ) MSales ON MS.Month = MSales.Month
      ORDER BY MS.Month;
      `,
  };

  return queries[code];
};

const getInsertQuery = (code) => {
  // 2XXX
  const queries = {
    2000: ``,
  };
  return queries[code];
};

const getUpdateQuery = (code) => {
  // 3XXX
  const queries = {
    3000: ``,
  };
  return queries[code];
};

const getDeleteQuery = (code) => {
  const queries = {
    4000: ``,
  };
  return queries[code];
};

const getAnalyticsQuery = (code) => {
  const queries = {
    9000: ``,
  };
  return queries[code];
};

module.exports = getSQLQuery;
