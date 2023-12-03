const express = require("express");
const router = express.Router();
const colors = require("../../controllers/cms-panels/colors/getColors");
const brands = require("../../controllers/cms-panels/brands/getBrands");
const types = require("../../controllers/cms-panels/product_type/getTypes");
const numbers = require("../../controllers/cms-panels/numbers/getNumbers");
const addBrand = require("../../controllers/cms-panels/brands/addBrand");
const addColor = require("../../controllers/cms-panels/colors/addColor");
const addNumber = require("../../controllers/cms-panels/numbers/addNumber");
const addType = require("../../controllers/cms-panels/product_type/addType");

router.get("/brands", brands);
router.get("/types", types);
router.get("/numbers", numbers);
router.get("/colors", colors);

router.post("/brand", addBrand);
router.post("/type", addType);
router.post("/number", addNumber);
router.post("/color", addColor);
module.exports = router;
