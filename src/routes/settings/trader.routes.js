const express = require("express");
const getTraderOptions = require("../../controllers/settings/trader-options/getTraderOptions");
const traderChat = require("../../controllers/settings/trader-chat/traderChat");
const addTraderOptions = require("../../controllers/settings/trader-options/addTraderOptions");
const editTraderOptions = require("../../controllers/settings/trader-options/editTraderOptions");
const editTraderChat = require("../../controllers/settings/trader-chat/editTraderChat");
const router = express.Router();

// GET Trader
router.get("/option", getTraderOptions);
router.get("/chat", traderChat);

// POST Trader
router.post("/option", addTraderOptions);

// PUT Trader
router.post("/option", editTraderOptions);
router.post("/chat", editTraderChat);

// DELETE Trader

module.exports = router;
