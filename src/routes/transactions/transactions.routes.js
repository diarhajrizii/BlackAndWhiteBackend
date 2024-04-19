const express = require("express");
const {
  getSalesTransactions,
  getTransactions,
} = require("../../controllers/transactions/getTransactions");
const getYearsSalesTransactions = require("../../controllers/transactions/getYearsSalesTransactions");
const updateTransaction = require("../../controllers/transactions/updateTransaction");
const addTransaction = require("../../controllers/transactions/addTransaction");
const router = express.Router();
router.get("/sales", getSalesTransactions);
router.put("/", updateTransaction);
router.post("/", addTransaction);
router.get("/", getTransactions);
router.post("/years", getYearsSalesTransactions);

module.exports = router;
