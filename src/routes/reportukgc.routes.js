const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middelware");
const totalNumberActiveUsers = require("../controllers/reportukgc/totalNumberActiveUsers");
const selfExclusionReopening = require("../controllers/reportukgc/selfExclusionReopening");
const listRegisteredUsers = require("../controllers/reportukgc/listRegisteredUsers");
const depositLimitsActivityLogs = require("../controllers/reportukgc/depositLimitsActivityLogs");
const selfExclusionReport = require("../controllers/reports/selfExclusionReport");
const turnoverBySports = require("../controllers/reports/turnoverBySports");

// Get reports
router.get("/total-number-active-users", auth, totalNumberActiveUsers);
router.get("/self-exclusion-reopening", auth, selfExclusionReopening);
router.get("/list-registered-users", auth, listRegisteredUsers);
router.get("/deposit-limit-activity-logs", auth, depositLimitsActivityLogs);
router.get("/self-exclusion-report", auth, selfExclusionReport);
router.get("/turnover-by-sports", auth, turnoverBySports);

// Post reports
module.exports = router;
