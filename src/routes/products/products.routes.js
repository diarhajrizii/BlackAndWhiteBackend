const express = require("express");
const router = express.Router();
const addProducts = require("../../controllers/products/addProducts");
const getProducts = require("../../controllers/products/getProducts");
const TransferProducts = require("../../controllers/products/TransferProducts");
router.post("/products", addProducts);
router.get("/products", getProducts);
router.put("/transfer", TransferProducts);

module.exports = router;
