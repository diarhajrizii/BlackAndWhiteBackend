const express = require("express");
const router = express.Router();

const sportType = require("../../controllers/sports/sportsType/sportType");
const sportOrder = require("../../controllers/sports/sportsOrder/sportOrder");
const addSportOrder = require("../../controllers/sports/sportsOrder/addSportOrder");
const cloneSportOrder = require("../../controllers/sports/sportsOrder/cloneSportOrder");
const deleteSportOrder = require("../../controllers/sports/sportsOrder/deleteSportOrder");
const editSportsType = require("../../controllers/sports/sportsType/editSportsType");
const sportTiers = require("../../controllers/sports/liabilitiesSport/sportTiers");
const addSportTier = require("../../controllers/sports/liabilitiesSport/addSportTier");
const editSportTier = require("../../controllers/sports/liabilitiesSport/editSportTier");
const deleteSportTier = require("../../controllers/sports/liabilitiesSport/deleteSportTier");

// GET Sport
router.get("/list", sportType);
router.get("/order", sportOrder);
router.get("/tiers", sportTiers);

// POST Sport
router.post("/order", addSportOrder);
router.post("/order/clone", cloneSportOrder);
router.post("/tier", addSportTier);

// PUT Sport
router.put("", editSportsType);
router.put("/tier", editSportTier);

// DELETE Sport
router.delete("", deleteSportOrder);
router.delete("/tier", deleteSportTier);

module.exports = router;
