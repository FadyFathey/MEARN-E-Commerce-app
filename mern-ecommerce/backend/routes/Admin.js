const express = require('express');
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const adminController = require('../controllers/Admin');
const router = express.Router();

router.get('/summary', verifyToken, verifyAdmin, adminController.summary);

module.exports = router;
