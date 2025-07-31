const express = require('express');
const productController = require('../controllers/Product');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const { validateProduct } = require('../middleware/Validation');
const router = express.Router();

router
  .post('/', verifyToken, verifyAdmin, validateProduct, productController.create)
  .get('/', productController.getAll)
  .get('/slug/:slug', productController.getBySlug)
  .get('/:id', productController.getById)
  .patch('/:id', verifyToken, verifyAdmin, validateProduct, productController.updateById)
  .patch('/undelete/:id', verifyToken, verifyAdmin, productController.undeleteById)
  .delete('/:id', verifyToken, verifyAdmin, productController.deleteById);

module.exports = router;
