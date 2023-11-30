const express = require("express");
const router = express.Router();

const liabilitie = require("../../controllers/trading/liabilitie");

// GET event
router.get("/list", liabilitie);

// POST event

// PUT event

// DELETE event

module.exports = router;
