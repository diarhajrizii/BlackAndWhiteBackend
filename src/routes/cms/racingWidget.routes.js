const express = require("express");
const addRacingWidget = require("../../controllers/cms/racing-widget/addRacingWidget");
const editRacingWidget = require("../../controllers/cms/racing-widget/editRacingWidget");
const addRaceWidget = require("../../controllers/cms/race-widget/addRaceWidget");
const editRaceWidget = require("../../controllers/cms/race-widget/editRaceWidget");
const orderRaceWidget = require("../../controllers/cms/race-widget/orderRaceWidget");
const publishRaceWidget = require("../../controllers/cms/race-widget/publishRaceWidget");
const deleteRaceWidget = require("../../controllers/cms/race-widget/deleteRaceWidget");
const router = express.Router();

// GET Racing Widget
// router.get("/race-widget/data", getWidgetData);
// router.get("/race-widget/race/:id", getRaceEventData);
// router.get("/race-widget/list", getWidgetList);

// POST Racing Widget
router.post("", addRacingWidget);
router.post("/race-widgetV2/add", addRaceWidget);

// PUT Racing Widget
router.put("", editRacingWidget);
router.put("/race-widgetV2/edit", editRaceWidget);

// PATCH Racing Widget
router.patch("/race-widgetV2/order", orderRaceWidget);
router.patch("/race-widgetV2/publish", publishRaceWidget);

// DELETE Racing Widget
router.delete("/race-widgetV2/delete", deleteRaceWidget);

module.exports = router;
