const express = require("express");
const router = express.Router();
const addProducts = require("../../contollers/products/addProducts");
router.post("/products", addProducts);

module.exports = router;
