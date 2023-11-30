const getMessageCodesByCodes = require("./getMessageCodesByCode");

module.exports = function getDepositLimitProperty(type) {
  switch (type) {
    case "daily":
      return "deposit_limit_daily";
    case "weekly":
      return "deposit_limit_weekly";
    case "monthly":
      return "deposit_limit_monthly";
    default:
      throw new Error(getMessageCodesByCodes(2213) + `: ${type}`);
  }
};
