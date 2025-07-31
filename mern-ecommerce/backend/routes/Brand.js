const express = require('express');
const brandController = require('../controllers/Brand');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const { validateBrand } = require('../middleware/Validation');
const router = express.Router();

router
  .get('/', brandController.getAll)
  .post('/', verifyToken, verifyAdmin, validateBrand, brandController.create)
  .patch('/:id', verifyToken, verifyAdmin, validateBrand, brandController.updateById)
  .delete('/:id', verifyToken, verifyAdmin, brandController.deleteById);

module.exports = router;
