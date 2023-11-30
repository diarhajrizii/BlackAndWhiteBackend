const express = require("express");
const betSlip = require("../../controllers/cms/bet-slip/betSlip");
const addBetSlip = require("../../controllers/cms/bet-slip/addBetSlip");
const editBetSlip = require("../../controllers/cms/bet-slip/editBetSlip");
const deleteBetSlip = require("../../controllers/cms/bet-slip/deleteBetSlip");
const publishBetSlip = require("../../controllers/cms/bet-slip/publishBetSlip");
const orderBetSlip = require("../../controllers/cms/bet-slip/orderBetSlip");
const router = express.Router();

// GET Bet Slip
router.get("/list", betSlip);

// POST Bet Slip
router.post("", addBetSlip);

// PUT Bet Slip
router.put("", editBetSlip);
router.put("/publish", publishBetSlip);
router.put("/order", orderBetSlip);

// DELETE Bet Slip
router.delete("", deleteBetSlip);

module.exports = router;
