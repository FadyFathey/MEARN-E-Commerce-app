const express = require('express');
const categoryController = require('../controllers/Category');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const { validateCategory } = require('../middleware/Validation');
const router = express.Router();

router
  .get('/', categoryController.getAll)
  .post('/', verifyToken, verifyAdmin, validateCategory, categoryController.create)
  .patch('/:id', verifyToken, verifyAdmin, validateCategory, categoryController.updateById)
  .delete('/:id', verifyToken, verifyAdmin, categoryController.deleteById);

module.exports = router;
