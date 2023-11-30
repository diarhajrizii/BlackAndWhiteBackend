const express = require("express");
const pushNotification = require("../../controllers/cms/push-notification/pushNotification");
const addPushNotifications = require("../../controllers/cms/push-notification/addPushNotifications");
const editSentStop = require("../../controllers/cms/push-notification/editSentStop");
const router = express.Router();

// GET Push notification
router.get("/list", pushNotification);

// POST Push notification
router.post("", addPushNotifications);

// PUT Push notification
router.put("", editSentStop);

// DELETE Push notification

module.exports = router;
