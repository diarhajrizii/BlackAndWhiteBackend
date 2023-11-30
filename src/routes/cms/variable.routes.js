const express = require("express");
const addVariable = require("../../controllers/cms/variables/variable");
const editVariable = require("../../controllers/cms/variables/editVariable");
const router = express.Router();

// GET Variable
router.get("/list", addVariable);

// POST Variable
router.post("", addVariable);

// PUT Variable
router.put("", editVariable);

// DELETE Variable

module.exports = router;
