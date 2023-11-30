const getUserData = require("../controllers/usersV2/getUserData");
const getUserStakeFactor = require("../controllers/usersV2/getUserStakeFactor");
const getUserNotes = require("../controllers/usersV2/getUserNotes");
const getUserStats = require("../controllers/usersV2/getUserStats");
const editUserData = require("../controllers/usersV2/editUserData");
const editTraderSettings = require("../controllers/usersV2/editTraderSettings");
const editContactPreference = require("../controllers/usersV2/editContactPreferences");
const editUserStakeFactorController = require("../controllers/usersV2/editUserStakeFactor");
const addUser = require('../controllers/usersV2/addUser');

const { Router } = require("express");
const auth = require("../middlewares/auth.middelware");
const deleteUserStakeFactor = require("../controllers/usersV2/deleteUserStakeFactor");

const router = Router();

router.get("/data/:sub_id", auth, getUserData);
router.get("/notes/:sub_id", auth, getUserNotes);
router.get("/stake-factor/:sub_id", auth, getUserStakeFactor); //TODO: remove api, payload retrieved by getUserData
router.get("/stats/:sub_id", auth, getUserStats);

router.put("/settings/edit", auth, editUserData);
router.put("/trader-settings/edit", auth, editTraderSettings);
router.put("/contact-preference/edit", auth, editContactPreference);
router.put("/user/stake-factor", auth, editUserStakeFactorController);

router.post('/add', auth, addUser)

router.delete("/user/stake-factor/:id", auth, deleteUserStakeFactor);

module.exports = router;
