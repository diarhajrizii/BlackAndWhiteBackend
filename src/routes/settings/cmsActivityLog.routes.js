const express = require("express");
const getCMSActivityLog = require("../../controllers/settings/getCMSActivityLog");
const router = express.Router();

// GET Cms Activity Log
router.get("list", getCMSActivityLog);

// POST Cms Activity Log

// PUT Cms Activity Log

// DELETE Cms Activity Log

module.exports = router;
