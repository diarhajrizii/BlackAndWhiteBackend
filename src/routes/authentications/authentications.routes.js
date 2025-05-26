const express = require("express");
const signUp = require("../../controllers/authentications/register");
const userData = require("../../controllers/authentications/userData");
const signIn = require("../../controllers/authentications/signIn");
const { auth } = require("../../controllers/middleware/auth.middleware");
const router = express.Router();
router.post("/sign-up", signUp);
router.post("/login", signIn);
router.get("/user", auth, userData);

module.exports = router;
