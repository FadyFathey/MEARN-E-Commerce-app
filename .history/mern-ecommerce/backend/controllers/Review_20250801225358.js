const Review = require('../models/Review');
const {
  updateProductRating,
  hasUserReviewed,
  getUserReview,
} = require('../utils/ratingCalculator');

exports.create = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const userId = req.user.id; // From verifyToken middleware

    // Check if user has already reviewed this product
    const existingReview = await hasUserReviewed(userId, product);
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message:
          'You have already reviewed this product. You can update your existing review instead.',
      });
    }

    // Create new review
    const reviewData = {
      user: userId,
      product,
      rating,
      comment,
    };

    const created = await new Review(reviewData).populate({ path: 'user', select: '-password' });
    await created.save();

    // Update product rating statistics
    await updateProductRating(product);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: created,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error posting review, please try again later',
    });
  }
};

exports.getByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = Number(req.query.limit);
      const page = Number(req.query.page);
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Review.find({ product: id }).countDocuments().exec();
    const result = await Review.find({ product: id })
      .skip(skip)
      .limit(limit)
      .populate('user', '-password')
      .sort({ createdAt: -1 })
      .exec();

    res.set('X-Total-Count', totalDocs);
    res.status(200).json({
      success: true,
      message: 'Reviews fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error getting reviews for this product, please try again later',
    });
  }
};

exports.getUserReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const review = await getUserReview(userId, productId);

    res.status(200).json({
      success: true,
      message: review ? 'User review found' : 'No review found for this product',
      data: review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error getting user review, please try again later',
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    // Find the review and check ownership
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews',
      });
    }

    // Update the review
    const updated = await Review.findByIdAndUpdate(id, { rating, comment }, { new: true }).populate(
      'user',
      '-password'
    );

    // Update product rating statistics
    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: updated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error updating review, please try again later',
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the review and check ownership
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews',
      });
    }

    const productId = review.product;
    const deleted = await Review.findByIdAndDelete(id);

    // Update product rating statistics
    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      data: deleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review, please try again later',
    });
  }
};

// Admin function to delete any review
exports.adminDeleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    const productId = review.product;
    const deleted = await Review.findByIdAndDelete(id);

    // Update product rating statistics
    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully by admin',
      data: deleted,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review, please try again later',
    });
  }
};
