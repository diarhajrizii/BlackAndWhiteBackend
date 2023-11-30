const express = require("express");
const countries = require("../../controllers/settings/countries/countries");
const editCountry = require("../../controllers/settings/countries/editCountry");
const router = express.Router();

// GET Countrie
router.get("/list", countries);

// POST Countrie

// PUT Countrie
router.post("", editCountry);

// DELETE Countrie

module.exports = router;
