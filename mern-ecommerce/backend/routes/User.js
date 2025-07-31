const express = require('express');
const userController = require('../controllers/User');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const router = express.Router();

router
  .get('/:id', verifyToken, userController.getById)
  .patch('/:id', verifyToken, userController.updateById)
  .delete('/:id', verifyToken, verifyAdmin, userController.deleteById);

module.exports = router;
