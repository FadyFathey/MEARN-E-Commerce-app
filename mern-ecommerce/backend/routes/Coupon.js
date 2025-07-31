const express = require('express');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const couponController = require('../controllers/Coupon');
const router = express.Router();

// Admin
router.post('/', verifyToken, verifyAdmin, couponController.create);
router.patch('/:id', verifyToken, verifyAdmin, couponController.updateById);
router.delete('/:id', verifyToken, verifyAdmin, couponController.deleteById);
router.get('/', verifyToken, verifyAdmin, couponController.getAll);

// User
router.post('/apply', verifyToken, couponController.applyCoupon);

module.exports = router;
