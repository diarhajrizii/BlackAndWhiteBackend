const express = require("express");
const allImages = require("../../controllers/cms/bet-slip/allImages");
const deleteImage = require("../../controllers/cms/bet-slip/deleteImage");
const addImageLibrary = require("../../controllers/cms/bet-slip/addImageLibrary");
const router = express.Router();

// GET Image
router.get("/list", allImages);

// POST Image
router.post("", addImageLibrary);

// PUT Image

// DELETE Image
router.delete("", deleteImage);

module.exports = router;
