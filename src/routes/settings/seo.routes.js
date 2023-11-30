const express = require("express");
const getSeo = require("../../controllers/settings/seo/getSeo");
const getSeoList = require("../../models/settings/seo/getSeoList");
const createSeo = require("../../controllers/settings/seo/createSeo");
const updateSeo = require("../../controllers/settings/seo/updateSeo");
const deleteSeo = require("../../controllers/settings/seo/deleteSeo");
const router = express.Router();

// GET Seo
router.get("/:pageName", getSeo);
router.get("/list", getSeoList);

// POST Seo
router.post("/add", createSeo);

// PUT Seo
router.patch("/update", updateSeo);

// DELETE Seo
router.delete("/:seoId", deleteSeo);

module.exports = router;
