const express = require("express");
const getTransactions = require("../../controllers/transactions/getTransactions");
const router = express.Router();
router.get("/", getTransactions);

module.exports = router;
