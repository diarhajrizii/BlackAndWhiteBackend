const express = require("express");
const router = express.Router();
const addProducts = require("../../controllers/products/addProducts");
const getProducts = require("../../controllers/products/getProducts");
router.post("/products", addProducts);
router.get("/products", getProducts);

module.exports = router;
