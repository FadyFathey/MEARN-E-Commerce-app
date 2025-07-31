const express = require('express');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const { validateShippingZone } = require('../middleware/Validation');
const shippingZoneController = require('../controllers/ShippingZone');
const router = express.Router();

// Public routes
router.get('/active', shippingZoneController.getActive);

// Admin routes
router.get('/', verifyToken, verifyAdmin, shippingZoneController.getAll);
router.get('/:id', verifyToken, verifyAdmin, shippingZoneController.getById);
router.post('/', verifyToken, verifyAdmin, validateShippingZone, shippingZoneController.create);
router.patch(
  '/:id',
  verifyToken,
  verifyAdmin,
  validateShippingZone,
  shippingZoneController.updateById
);
router.delete('/:id', verifyToken, verifyAdmin, shippingZoneController.deleteById);

module.exports = router;
