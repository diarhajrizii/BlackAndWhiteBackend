const express = require("express");
const getCssStyle = require("../../controllers/settings/css-styles/getCssStyle");
const getCssStyleContent = require("../../controllers/settings/css-styles/getCssStyleContent");
const addCssStyle = require("../../controllers/settings/css-styles/addCssStyle");
const router = express.Router();

// GET Css
router.get("/list", getCssStyle);
router.get("/content", getCssStyleContent);

// POST Css
router.post("", addCssStyle);

// PUT Css

// DELETE Css

module.exports = router;
