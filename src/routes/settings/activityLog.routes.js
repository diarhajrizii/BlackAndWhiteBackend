const express = require("express");
const getActivityLog = require("../../controllers/settings/getActivityLog");
const ActivityLogRouter = express.Router();

// GET Activity Log
ActivityLogRouter.get("/list", getActivityLog);

// POST Activity Log

// PUT Activity Log

// DELETE Activity Log

module.exports = ActivityLogRouter;
