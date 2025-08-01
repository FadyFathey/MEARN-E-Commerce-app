const express = require('express');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const { validateBulkUpdateAttributes } = require('../middleware/Validation');
const adminController = require('../controllers/Admin');
const router = express.Router();

router.get('/summary', verifyToken, verifyAdmin, adminController.summary);

// Product attribute management routes
router.get(
  '/product-attributes',
  verifyToken,
  verifyAdmin,
  adminController.getProductAttributesSummary
);
router.post(
  '/bulk-update-attributes',
  verifyToken,
  verifyAdmin,
  validateBulkUpdateAttributes,
  adminController.bulkUpdateProductAttributes
);
router.get(
  '/products/:attribute/:value',
  verifyToken,
  verifyAdmin,
  adminController.getProductsByAttribute
);

module.exports = router;
