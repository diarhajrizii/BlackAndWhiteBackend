const express = require("express");
const games = require("../../controllers/cms/casino/games");
const groups = require("../../controllers/cms/casino/groups");
const groupItems = require("../../controllers/cms/casino/groupItems");
const addGroup = require("../../controllers/cms/casino/addGroup");
const deleteGroup = require("../../controllers/cms/casino/deleteGroup");
const orderGroup = require("../../controllers/cms/casino/orderGroup");
const addGame = require("../../controllers/cms/casino/addGame");
const editGame = require("../../controllers/cms/casino/editGame");
const orderGame = require("../../controllers/cms/casino/orderGame");
const orderCasinoGame = require("../../controllers/cms/casino/orderCasinoGame");
const router = express.Router();

// GET Casino
router.get("/game", games);
router.get("/group", groups);
router.get("/group-items", groupItems);

// POST Casino
router.post("/group", addGroup);
router.post("/game", addGame);
router.put("/order", orderCasinoGame);

// PUT Casino
router.put("/order-group", orderGroup);
router.put("/game", editGame);
router.put("/order-game", orderGame);

// DELETE Casino
router.delete("/group", deleteGroup);

module.exports = router;
