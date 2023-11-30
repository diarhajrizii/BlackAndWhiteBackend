const express = require("express");
const terms = require("../../controllers/cms/terms/terms");
const termVersion = require("../../controllers/cms/terms/termVersion");
const editTerm = require("../../controllers/cms/terms/editTerm");
const router = express.Router();

// GET Term
router.get("/list", terms);
router.get("/version", termVersion);

// POST Term

// PUT Term
router.put("", editTerm);

// DELETE Term

module.exports = router;
