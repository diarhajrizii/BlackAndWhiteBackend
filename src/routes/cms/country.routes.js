const express = require("express");
const changeCountries = require("../../controllers/cms/changeCountries");
const router = express.Router();

// GET Country
router.get("/list", changeCountries);

// POST Country

// PUT Country

// DELETE Country

module.exports = router;
