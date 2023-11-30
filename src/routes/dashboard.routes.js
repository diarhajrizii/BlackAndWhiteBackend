const express = require("express");
const dashboard = require("../controllers/dashboard/dashboard");
const router = express.Router();
const auth = require("../middlewares/auth.middelware");
const getStatistics = require("../controllers/dashboard/getStatistics");

// Get Dashboard
router.get("/miniwdget", auth, dashboard);
router.get("/statistics", auth, getStatistics);

module.exports = router;
