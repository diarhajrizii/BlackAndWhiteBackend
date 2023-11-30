const express = require("express");
const pageLayout = require("../../controllers/cms/page-layout/pageLayout");
const addPageLayout = require("../../controllers/cms/page-layout/addPageLayout");
const deletePageLayout = require("../../controllers/cms/page-layout/deletePageLayout");
const orderPageLayout = require("../../controllers/cms/page-layout/orderPageLayout");
const router = express.Router();

// GET Layout
router.get("/list", pageLayout);

// POST Layout
router.post("", addPageLayout);

// PUT Layout
router.put("/order", orderPageLayout);

// DELETE Layout
router.delete("", deletePageLayout);

module.exports = router;
