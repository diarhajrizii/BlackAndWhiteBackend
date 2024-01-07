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
    1000: ``,
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
