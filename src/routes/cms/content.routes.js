const express = require("express");
const content = require("../../controllers/cms/content/content");
const publishedContent = require("../../controllers/cms/content/publishedContent");
const pageContent = require("../../controllers/cms/page-content/pageContent");
const deleteBetSlip = require("../../controllers/cms/bet-slip/deleteBetSlip");
const editContent = require("../../controllers/cms/page-content/editContent");
const deletePageContent = require("../../controllers/cms/page-content/deletePageContent");
const generalDelete = require("../../controllers/cms/generalDelete");
const router = express.Router();

// GET Content
router.get("/list", content);
router.get("/published", publishedContent);
router.get("/page", pageContent);

// POST Content

// PUT Content
router.put("/page", editContent);

// DELETE Content
router.delete("", deleteBetSlip);
router.delete("/page", deletePageContent);
router.delete("/general", generalDelete);

module.exports = router;
