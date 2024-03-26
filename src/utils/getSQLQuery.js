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
    1003: `
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
            AND product_type = 'shoes'
          GROUP BY Month
        ) T ON MS.Month = T.Month
        LEFT JOIN (
          SELECT 
            MONTH(STR_TO_DATE(Month, '%M')) AS Month,
            SUM(shoesSales) AS TotalSales
          FROM monthlySales
          WHERE Year = ${vars}
          GROUP BY Month
        ) MSales ON MS.Month = MSales.Month
        ORDER BY MS.Month;
      `,
    1004: `
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
            AND product_type = 'textile'
          GROUP BY Month
        ) T ON MS.Month = T.Month
        LEFT JOIN (
          SELECT 
            MONTH(STR_TO_DATE(Month, '%M')) AS Month,
            SUM(TextileSales) AS TotalSales
          FROM monthlySales
          WHERE Year = ${vars}
          GROUP BY Month
        ) MSales ON MS.Month = MSales.Month
        ORDER BY MS.Month;
      `,
    1005: `
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
              AND product_type = 'accessories'
            GROUP BY Month
          ) T ON MS.Month = T.Month
          LEFT JOIN (
            SELECT 
              MONTH(STR_TO_DATE(Month, '%M')) AS Month,
              SUM(AccessoriesSales) AS TotalSales
            FROM monthlySales
            WHERE Year = ${vars}
            GROUP BY Month
          ) MSales ON MS.Month = MSales.Month
          ORDER BY MS.Month;
      `,
    1006: `
      WITH MonthTable AS (
        SELECT
          LPAD(MONTH(CURDATE() - INTERVAL a.a MONTH), 2, '0') AS Month
        FROM
          (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3) AS a
        ORDER BY
          a.a
      )
      SELECT
        mt.Month,
        IFNULL(COUNT(t.id), 0) AS QuantitySold
      FROM
        MonthTable mt
      LEFT JOIN
        transactions t ON MONTH(t.date) = mt.Month
        AND YEAR(t.date) = 2024
        AND t.type = 'sale'
      WHERE
        mt.Month IS NOT NULL
      GROUP BY
        mt.Month
      ORDER BY
        mt.Month; 
    `,
    1007: `
      WITH Calendar AS (
        SELECT '01' AS Month UNION ALL
        SELECT '02' AS Month UNION ALL
        SELECT '03' AS Month UNION ALL
        SELECT '04' AS Month UNION ALL
        SELECT '05' AS Month UNION ALL
        SELECT '06' AS Month UNION ALL
        SELECT '07' AS Month UNION ALL
        SELECT '08' AS Month UNION ALL
        SELECT '09' AS Month UNION ALL
        SELECT '10' AS Month UNION ALL
        SELECT '11' AS Month UNION ALL
        SELECT '12' AS Month
      )
      SELECT
          c.Month,
          IFNULL(SUM(CASE WHEN t.sale_type = 'online' THEN t.price ELSE 0 END), 0) AS TotalSales
      FROM
          Calendar c
      LEFT JOIN
          transactions t ON c.Month = DATE_FORMAT(t.date, '%m') AND t.type = 'sale' AND YEAR(t.date) = 2024
      GROUP BY
          c.Month
      ORDER BY
          c.Month;`,
    1008: `      
      WITH Calendar AS (
        SELECT '01' AS Month UNION ALL
        SELECT '02' AS Month UNION ALL
        SELECT '03' AS Month UNION ALL
        SELECT '04' AS Month UNION ALL
        SELECT '05' AS Month UNION ALL
        SELECT '06' AS Month UNION ALL
        SELECT '07' AS Month UNION ALL
        SELECT '08' AS Month UNION ALL
        SELECT '09' AS Month UNION ALL
        SELECT '10' AS Month UNION ALL
        SELECT '11' AS Month UNION ALL
        SELECT '12' AS Month
      )
      SELECT
          c.Month,
          IFNULL(SUM(CASE WHEN t.payment_type = 'bank' THEN t.price ELSE 0 END), 0) AS TotalSales
      FROM
          Calendar c
      LEFT JOIN
          transactions t ON c.Month = DATE_FORMAT(t.date, '%m') AND t.type = 'sale' AND YEAR(t.date) = 2024
      GROUP BY
          c.Month
      ORDER BY
          c.Month;`,
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
