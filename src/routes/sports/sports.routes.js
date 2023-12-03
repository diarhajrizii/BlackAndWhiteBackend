const express = require("express");
const router = express.Router();
const dashboard = require("../../controllers/dashboard/dashboard");
router.get("/sport", dashboard); // TODO: Remove this route

module.exports = router;
