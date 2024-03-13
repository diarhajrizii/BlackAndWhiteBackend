const express = require("express");
const signUp = require("../../controllers/authentications/register");
const signIn = require("../../controllers/authentications/signIn");
const router = express.Router();
router.post("/sign-up", signUp);
router.post("/login", signIn);

module.exports = router;
