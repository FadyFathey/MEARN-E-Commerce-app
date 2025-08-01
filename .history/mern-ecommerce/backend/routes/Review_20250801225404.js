const express = require('express');
const reviewController = require("../controllers/Review");
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');
const { validateReview } = require('../middleware/Validation');
const router = express.Router();

// Public routes
router.get('/product/:id', reviewController.getByProductId);

// Protected routes (require authentication)
router
    .post("/", verifyToken, validateReview, reviewController.create)
    .get('/user/:productId', verifyToken, reviewController.getUserReview)
    .patch('/:id', verifyToken, validateReview, reviewController.updateById)
    .delete("/:id", verifyToken, reviewController.deleteById);

// Admin routes
router.delete("/admin/:id", verifyToken, verifyAdmin, reviewController.adminDeleteById);

module.exports = router;