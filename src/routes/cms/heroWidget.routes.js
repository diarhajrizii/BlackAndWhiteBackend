const express = require("express");
const addHeroWidget = require("../../controllers/cms/hero-widget/addHeroWidget");
const editHeroWidget = require("../../controllers/cms/hero-widget/editHeroWidget");
const orderHeroWidget = require("../../controllers/cms/hero-widget/orderHeroWidget");
const publishHeroWidget = require("../../controllers/cms/hero-widget/publishHeroWidget");
const router = express.Router();

// GET Hero Widget

// POST Hero Widget
router.post("", addHeroWidget);

// PUT Hero Widget
router.put("", editHeroWidget);
router.put("/order", orderHeroWidget);
router.put("/publish", publishHeroWidget);

// DELETE Hero Widget

module.exports = router;
