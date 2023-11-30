const express = require("express");
const addHeroBanner = require("../../controllers/cms/hero-banner/addHeroBanner");
const editHeroBanner = require("../../controllers/cms/hero-banner/editHeroBanner");
const publishHeroBanner = require("../../controllers/cms/hero-banner/publishHeroBanner");
const router = express.Router();

// GET Hero Banner

// POST Hero Banner
router.post("", addHeroBanner);

// PUT Hero Banner
router.put("", editHeroBanner);
router.put("/publish", publishHeroBanner);

// DELETE Hero Banner

module.exports = router;
