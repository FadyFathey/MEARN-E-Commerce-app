const express = require('express');
const shippingController = require('../controllers/Shipping');
const router = express.Router();

// Public routes for shipping calculations
router.post('/calculate', shippingController.calculateShipping);
router.get('/zones', shippingController.getShippingZones);

module.exports = router;
