const express = require("express");
const getAllCurrencies = require("../../controllers/settings/currencies/getAllCurrencies");
const editCurrency = require("../../controllers/settings/currencies/editCurrency");
const router = express.Router();

// GET Currency
router.get("/list", getAllCurrencies);

// POST Currency

// PUT Currency
router.post("", editCurrency);

// DELETE Currency

module.exports = router;
