const express = require("express");
const router = express.Router();
const addProducts = require("../../controllers/products/addProducts");
const getProducts = require("../../controllers/products/getProducts");
const TransferProducts = require("../../controllers/products/TransferProducts");
const sellProducts = require("../../controllers/products/sellProducts");
const { auth } = require("../../controllers/middleware/auth.middleware");
const {
  authRoles,
} = require("../../controllers/middleware/authorize.middleware");
const { ADMIN } = require("../../configs/roles.config");
router.post("/products", auth, addProducts);
router.get("/products", auth, authRoles(ADMIN), getProducts);
router.put("/products", auth, sellProducts);
router.put("/transfer", auth, TransferProducts);

module.exports = router;
