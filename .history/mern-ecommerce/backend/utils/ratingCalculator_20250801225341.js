const Review = require('../models/Review');
const Product = require('../models/Product');

/**
 * Calculate and update product rating statistics
 * @param {string} productId - The product ID to update
 */
exports.updateProductRating = async (productId) => {
  try {
    // Aggregate reviews for the product
    const ratingStats = await Review.aggregate([
      { $match: { product: productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          numReviews: { $sum: 1 }
        }
      }
    ]);

    // Extract values or use defaults
    const averageRating = ratingStats.length > 0 ? Math.round(ratingStats[0].averageRating * 10) / 10 : 0;
    const numReviews = ratingStats.length > 0 ? ratingStats[0].numReviews : 0;

    // Update the product
    await Product.findByIdAndUpdate(productId, {
      averageRating,
      numReviews
    });

    return { averageRating, numReviews };
  } catch (error) {
    console.error('Error updating product rating:', error);
    throw error;
  }
};

/**
 * Check if user has already reviewed a product
 * @param {string} userId - The user ID
 * @param {string} productId - The product ID
 * @returns {Promise<boolean>} - True if user has already reviewed
 */
exports.hasUserReviewed = async (userId, productId) => {
  try {
    const existingReview = await Review.findOne({ user: userId, product: productId });
    return !!existingReview;
  } catch (error) {
    console.error('Error checking user review:', error);
    throw error;
  }
};

/**
 * Get user's existing review for a product
 * @param {string} userId - The user ID
 * @param {string} productId - The product ID
 * @returns {Promise<Object|null>} - The review object or null
 */
exports.getUserReview = async (userId, productId) => {
  try {
    return await Review.findOne({ user: userId, product: productId });
  } catch (error) {
    console.error('Error getting user review:', error);
    throw error;
  }
}; 