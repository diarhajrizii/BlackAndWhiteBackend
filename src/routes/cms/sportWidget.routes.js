const express = require("express");
const sportWidget = require("../../controllers/cms/sport-widget/sportWidget");
const addSportWidget = require("../../controllers/cms/sport-widget/addSportWidget");
const editSportWidget = require("../../controllers/cms/sport-widget/editSportWidget");
const deleteSportWidget = require("../../controllers/cms/sport-widget/deleteSportWidget");
const router = express.Router();

// GET Sport widget
router.get("/list", sportWidget);

// POST Sport widget
router.post("", addSportWidget);

// PUT Sport widget
router.put("", editSportWidget);

// DELETE Sport widget
router.delete("", deleteSportWidget);

module.exports = router;
