const express = require("express");
const router = express.Router();

// Get
const colors = require("../../controllers/cms-panels/colors/getColors");
const brands = require("../../controllers/cms-panels/brands/getBrands");
const types = require("../../controllers/cms-panels/product_type/getTypes");
const numbers = require("../../controllers/cms-panels/numbers/getNumbers");

// Post
const addBrand = require("../../controllers/cms-panels/brands/addBrand");
const addColor = require("../../controllers/cms-panels/colors/addColor");
const addNumber = require("../../controllers/cms-panels/numbers/addNumber");
const addType = require("../../controllers/cms-panels/product_type/addType");

// Put
const editBrands = require("../../controllers/cms-panels/brands/editBrands");
const editColor = require("../../controllers/cms-panels/colors/editColor");
const editNumber = require("../../controllers/cms-panels/numbers/editNumber");
const editType = require("../../controllers/cms-panels/product_type/editType");

// Delete
const deleteBrand = require("../../controllers/cms-panels/brands/deleteBrand");
const deleteColor = require("../../controllers/cms-panels/colors/deleteColor");
const deleteNumber = require("../../controllers/cms-panels/numbers/deleteNumber");
const deleteType = require("../../controllers/cms-panels/product_type/deleteType");

router.get("/brands", brands);
router.get("/types", types);
router.get("/numbers", numbers);
router.get("/colors", colors);

router.post("/brand", addBrand);
router.post("/type", addType);
router.post("/number", addNumber);
router.post("/color", addColor);

router.put("/brand", editBrands);
router.put("/color", editColor);
router.put("/number", editNumber);
router.put("/type", editType);

router.delete("/brand", deleteBrand);
router.delete("/color", deleteColor);
router.delete("/number", deleteNumber);
router.delete("/type", deleteType);

module.exports = router;
