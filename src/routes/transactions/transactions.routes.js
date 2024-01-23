const express = require("express");
const getTransactions = require("../../controllers/transactions/getTransactions");
const getYearsSalesTransactions = require("../../controllers/transactions/getYearsSalesTransactions");
const router = express.Router();
router.get("/", getTransactions);
router.get("/years", getYearsSalesTransactions);

module.exports = router;
