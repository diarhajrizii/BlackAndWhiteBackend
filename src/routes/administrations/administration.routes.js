// routes/administrations/index.js

const express = require("express");
const getAdministrationArticles = require("../../controllers/administrations/getAdministrationArticles");
const addAdministrationArticle = require("../../controllers/administrations/addAdministrationArticle");
const recordAdministrationSale = require("../../controllers/administrations/recordAdministrationSale");
const addQuantityToArticle = require("../../controllers/administrations/addQuantityToArticle");
const getAdministrationSales = require("../../controllers/administrations/getAdministrationSales");
const editAdministrationArticle = require("../../controllers/administrations/editAdministrationArticle");

const router = express.Router();

router.get("/articles", getAdministrationArticles);
router.get("/sales", getAdministrationSales);

router.post("/articles", addAdministrationArticle);
router.post("/sales", recordAdministrationSale);
router.post("/add-quantity", addQuantityToArticle);

router.put("/articles/:id", editAdministrationArticle);

module.exports = router;
