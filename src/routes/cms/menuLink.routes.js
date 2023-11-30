const express = require("express");
const menuLinks = require("../../controllers/cms/menu-link/menuLinks");
const addMenuLink = require("../../controllers/cms/menu-link/addMenuLink");
const deleteMenuLinks = require("../../controllers/cms/menu-link/deleteMenuLinks");
const editMenuLinks = require("../../controllers/cms/menu-link/editMenuLinks");
const orderMenuLinks = require("../../controllers/cms/menu-link/orderMenuLinks");
const changeMenuLinksShow = require("../../controllers/cms/menu-link/changeMenuLinksShow");
const router = express.Router();

// GET Menu Link
router.get("/list", menuLinks);

// POST Menu Link
router.post("", addMenuLink);

// PUT Menu Link
router.put("", editMenuLinks);
router.put("/order", orderMenuLinks);
router.put("/show", changeMenuLinksShow);

// DELETE Menu Link
router.delete("", deleteMenuLinks);

module.exports = router;
