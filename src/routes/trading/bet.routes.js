const express = require("express");
const router = express.Router();
const changeBetStatus = require("../../controllers/trading/changeBetStatus");
const changeBetResult = require("../../controllers/trading/changeBetResult");
const addCustomBets = require("../../controllers/trading/addCustomBets");
const betsOdds = require("../../controllers/trading/betsOdds");
const bets = require("../../controllers/trading/bets");

// Get Bet
router.get("", bets);
router.get("/odds", betsOdds);

// Post Bet
router.post("/custom", addCustomBets);

// Put Bet
router.put("", changeBetStatus);
router.put("/result", changeBetResult);

// Delete Bet

module.exports = router;
