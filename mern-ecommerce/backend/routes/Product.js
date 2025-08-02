const express = require('express');
const productController = require('../controllers/Product');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const { validateProduct, validateProductAttributes } = require('../middleware/Validation');
const router = express.Router();

// Admin-specific routes for managing product attributes (MUST come before /:id route)
router
  .get('/featured', productController.getFeaturedProducts)
  .get('/top-sellers', productController.getTopSellers)
  .get('/new-arrivals', productController.getNewArrivals)
  .get('/best-deals', productController.getBestDeals)
  .get('/flash-deals', productController.getFlashDeals)
  .get('/trending', productController.getTrendingProducts)
  .get('/tags', productController.getAllTags)
  .get('/tag/:tag', productController.getProductsByTag);

// General product routes
router
  .post('/', verifyToken, verifyAdmin, validateProduct, productController.create)
  .get('/', productController.getAll)
  .get('/slug/:slug', productController.getBySlug)
  .get('/:id', productController.getById)
  .patch('/:id', verifyToken, verifyAdmin, validateProduct, productController.updateById)
  .patch('/undelete/:id', verifyToken, verifyAdmin, productController.undeleteById)
  .delete('/:id', verifyToken, verifyAdmin, productController.deleteById);

// Admin-specific attribute update route
router.patch(
  '/:id/attributes',
  verifyToken,
  verifyAdmin,
  validateProductAttributes,
  productController.updateProductAttributes
);

module.exports = router;
