const express = require("express");
const addCarousel = require("../../controllers/cms/carousel/addCarousel");
const editCarousel = require("../../controllers/cms/carousel/editCarousel");
const publishCarousel = require("../../controllers/cms/carousel/publishCarousel");
const orderCarousel = require("../../controllers/cms/carousel/orderCarousel");
const router = express.Router();

// GET Carousel

// POST Carousel
router.post("", addCarousel);

// PUT Carousel
router.put("", editCarousel);
router.put("/publish", publishCarousel);
router.put("/order", orderCarousel);

// DELETE Carousel

module.exports = router;
