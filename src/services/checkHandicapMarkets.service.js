const { query } = require("../services/db.service");

async function checkHandicapMarkets() {
  try {
    let return_data;
    let queryS = `SELECT market_id FROM market_type WHERE handicap = 'yes';`;
    var resp = await query({
      connection: dbGS,
      sql: queryS,
      params: [],
    });
    var marketsIds = [];
    if (resp.status && resp.data.length > 0) {
      for (var i = 0; i < resp.data.length; i++) {
        var row = resp.data[i];
        marketsIds.push(row.market_id);
      }
    }
    return_data = marketsIds;
    return return_data;
  } catch (e) {
    return { status: false, message: e.message };
  }
}

module.exports = { checkHandicapMarkets };
