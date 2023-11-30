const express = require("express");
const editLanguageStatus = require("../../controllers/settings/languages/editLanguageStatus");
const getLanguages = require("../../controllers/settings/languages/getLanguages");
const translateText = require("../../controllers/settings/languages/translateText");
const router = express.Router();

// Get Language
router.get("/list", getLanguages);

// Post Language
router.post("/translate-text", translateText);

// Put Language
router.post("/status", editLanguageStatus);

// Delete Language

module.exports = router;
