const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middelware");

// Auth endpoints
const signIn = require("../controllers/authentication/signIn");
const deleteUser = require("../controllers/authentication/deleteUsers");
const getUserList = require("../controllers/authentication/userList");
const setupMFA = require("../controllers/authentication/setupMFA");
const refreshToken = require("../controllers/authentication/refreshToken");
const getUser = require("../controllers/authentication/getUser");
const checkToken = require("../controllers/authentication/checkToken");
const resetPassword = require("../controllers/authentication/resetPassword");
const signInFirst = require("../controllers/authentication/signInFirst");
const confirmPassword = require("../controllers/authentication/confirmPassword");
const signOut = require("../controllers/authentication/signOut");
const createUser = require("../controllers/authentication/createUser");
const updateUser = require("../controllers/authentication/updateUser");
const changeMFAStatus = require("../controllers/authentication/changeMFAStatus");
const verifyMFAToken = require("../controllers/authentication/verifyMFAToken");
const reset2FA = require("../controllers/authentication/reset2FA");
const blockUser = require("../controllers/authentication/blockUser");
const signinVerifyMFAToken = require("../controllers/authentication/signinVerifyMFAToken");
const setMFAStatusForUser = require("../controllers/authentication/setMFAStatusForUser");
const changePassword = require("../controllers/authentication/changePassword");
const AWSRegisterGamingUser = require("../controllers/authentication/AWSRegisterGamingUser");

// Authentication
router.post("/sign-in", signIn);
router.post("/sign-in-first", signInFirst);
router.post("/sign-out", auth, signOut);
router.post("/reset-password", resetPassword);
router.post("/confirm-password", confirmPassword);
router.post("/refresh-token", refreshToken);
router.post("/setup-mfa", auth, setupMFA);
router.post("/delete-user", auth, deleteUser);
router.get("/user-list", auth, getUserList);
router.get("/get-user", auth, getUser);
router.get("/check-token", auth, checkToken);
router.post("/create-user", auth, createUser);
router.post("/update-user", auth, updateUser);
router.post("/change-mfa-status", auth, changeMFAStatus);
router.post("/reset-2fa", auth, reset2FA);
router.post("/verify-mfa-token", auth, verifyMFAToken);
router.post("/block-user", auth, blockUser);
router.post("/sign-verify-mfa-token", signinVerifyMFAToken);
router.post("/mfa-status-for-user", setMFAStatusForUser);
router.post("/change-password", auth, changePassword);
router.post("/create-gaming-user", auth, AWSRegisterGamingUser);

module.exports = router;
