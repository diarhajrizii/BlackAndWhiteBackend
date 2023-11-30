const express = require("express");
const marketsGroup = require("../../controllers/trading/marketsGroup");
const markets = require("../../controllers/trading/markets");
const marketSelection = require("../../controllers/trading/marketSelection");
const addMarketsGroup = require("../../controllers/trading/addMarketsGroup");
const addMarketType = require("../../controllers/trading/addMarketType");
const editMarketType = require("../../controllers/trading/editMarketType");
const editMarketSelection = require("../../controllers/trading/editMarketSelection");
const deleteSelectMarketType = require("../../controllers/trading/deleteSelectMarketType");
const deleteMarketType = require("../../controllers/trading/deleteMarketType");
const router = express.Router();

// Get Market
router.get("/list", markets);
router.get("/group", marketsGroup);
router.get("/selection", marketSelection);

// Post Market
router.post("/group", addMarketsGroup);
router.post("/selection", addMarketType);

// Put Market
router.put("/type", editMarketType);
router.put("/selection", editMarketSelection);

// Delete Market
router.delete("/type", deleteMarketType);
router.delete("/selection", deleteSelectMarketType);

module.exports = router;
