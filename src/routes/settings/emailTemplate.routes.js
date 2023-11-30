const express = require("express");
const getEmailTemplates = require("../../controllers/settings/getEmailTemplates");
const postSendEmail = require("../../controllers/settings/postSendEmail");
const editEmailTemplates = require("../../controllers/settings/editEmailTemplates");
const router = express.Router();

// GET Email Template
router.get("/list", getEmailTemplates);

// POST Email Template
router.post("", postSendEmail);

// PUT Email Template
router.post("", editEmailTemplates);

// DELETE Email Template

module.exports = router;
