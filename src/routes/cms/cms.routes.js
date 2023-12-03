const express = require("express");
const router = express.Router();
const colors = require("../../contollers/cms/colors/colors");
const brands = require("../../contollers/cms/brands/brands");
const types = require("../../contollers/cms/product_type/types");
const numbers = require("../../contollers/cms/numbers/numbers");

console.log("vvv");
router.get("/brands", brands);
router.get("/types", types);
router.get("/numbers", numbers);
router.get("/colors", colors);
module.exports = router;
