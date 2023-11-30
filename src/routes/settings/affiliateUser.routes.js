const express = require("express");
const getAffiliateUsers = require("../../controllers/settings/affiliate-users/getAffiliateUsers");
const addAffiliateUser = require("../../controllers/settings/affiliate-users/addAffiliateUser");
const deleteAffiliateUser = require("../../controllers/settings/affiliate-users/deleteAffiliateUser");
const AffiliateUserRouter = express.Router();

// GET Affiliate User
AffiliateUserRouter.get("/list", getAffiliateUsers);
AffiliateUserRouter.get("", getAffiliateUsers);

// POST Affiliate User
AffiliateUserRouter.post("", addAffiliateUser);

// PUT Affiliate User

// DELETE Affiliate User
AffiliateUserRouter.delete("/:affiliateId", deleteAffiliateUser);

module.exports = AffiliateUserRouter;
