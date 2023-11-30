const express = require("express");
const messageCodes = require("../../controllers/cms/message-codes/messageCodes");
const addMessageCodes = require("../../controllers/cms/message-codes/addMessageCodes");
const editMessageCodes = require("../../controllers/cms/message-codes/editMessageCodes");
const router = express.Router();

// GET Message code
router.get("/list", messageCodes);

// POST Message code
router.post("", addMessageCodes);

// PUT Message code
router.put("", editMessageCodes);

// DELETE Message code

module.exports = router;
