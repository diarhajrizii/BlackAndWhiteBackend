const express = require("express");
const policies = require("../../controllers/cms/policies/policies");
const editPolicies = require("../../controllers/cms/policies/editPolicies");
const router = express.Router();

// GET Policy
router.get("/list", policies);

// POST Policy

// PUT Policy
router.put("", editPolicies);

// DELETE Policy

module.exports = router;
