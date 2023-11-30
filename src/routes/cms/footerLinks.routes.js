const express = require("express");
const links = require("../../controllers/cms/footer-links/links");
const linkGroups = require("../../controllers/cms/footer-links/linkGroups");
const saveLinks = require("../../controllers/cms/footer-links/saveLinks");
const deleteLink = require("../../controllers/cms/footer-links/deleteLink");
const orderLink = require("../../controllers/cms/footer-links/orderLink");
const deleteFooterLink = require("../../controllers/cms/footer-links/deleteFooterLink");
const router = express.Router();

// GET Footer links
router.get("/list", links);
router.get("/grouped", linkGroups);

// POST Footer links
router.post("", saveLinks);

// PUT Footer links
router.put("/order", orderLink);

// DELETE Footer links
router.delete("", deleteLink);
router.delete("/:id", deleteFooterLink);

module.exports = router;
