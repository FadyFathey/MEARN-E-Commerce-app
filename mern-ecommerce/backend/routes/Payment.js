const express = require('express');
const router = express.Router();
const { createPaymentIntent, handleStripeWebhook } = require('../controllers/Payment');
const { verifyToken } = require('../middleware/VerifyToken');

// Create a payment intent
router.post('/create-payment-intent', verifyToken, createPaymentIntent);

// Stripe webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
