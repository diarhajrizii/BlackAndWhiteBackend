const express = require("express");
const addLadder = require("../../controllers/settings/ladders/addLadder");
const editLadder = require("../../controllers/settings/ladders/editLadders");
const getLadderBySport = require("../../controllers/settings/ladders/getLadderBySport");
const importCustomLadder = require("../../controllers/settings/ladders/importCustomLadder");
const handleFileUpload = require("../../middlewares/multer.middleware");
const deleteLadder = require("../../controllers/settings/ladders/deleteLadder");
const LadderRouter = express.Router();

// GET Ladder
LadderRouter.get("/:sport_slug", getLadderBySport);

// POST Ladder
LadderRouter.post("", addLadder);
LadderRouter.post("/import-csv", handleFileUpload, importCustomLadder);

// PUT Ladder
LadderRouter.put("/:sport_slug", editLadder);

// DELETE Ladder
LadderRouter.delete("/:ladderId", deleteLadder);

module.exports = LadderRouter;
