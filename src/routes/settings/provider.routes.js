const express = require("express");
const getProviders = require("../../controllers/settings/providers/getProviders");
const editProvider = require("../../controllers/settings/providers/addProvider");
const deleteProvider = require("../../controllers/settings/providers/deleteProvider");
const router = express.Router();

// GET Provider
router.get("/list", getProviders);

// POST Provider

// PUT Provider
router.post("", editProvider);

// DELETE Provider
router.delete("/:providerId", deleteProvider);

module.exports = router;
