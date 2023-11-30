const express = require("express");
const paymentGateways = require("../../controllers/settings/payment-gateways/paymentGateways");
const router = express.Router();

// GET Payment Gateway
router.get("/list", paymentGateways);

// POST Payment Gateway

// PUT Payment Gateway

// DELETE Payment Gateway

module.exports = router;
