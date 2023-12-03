const express = require("express");
const router = express.Router();
const addProducts = require("../../controllers/products/addProducts");
router.post("/products", addProducts);

module.exports = router;
