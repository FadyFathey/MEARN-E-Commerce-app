const { updateProductRating } = require('./ratingCalculator');
const Product = require('../models/Product');
const Review = require('../models/Review');

/**
 * Update all products with their current rating statistics
 * This should be run after adding the rating fields to the Product model
 */
exports.updateAllProductRatings = async () => {
  try {
    console.log('Starting to update all product ratings...');

    // Get all products that have reviews
    const productsWithReviews = await Review.distinct('product');

    console.log(`Found ${productsWithReviews.length} products with reviews`);

    let updatedCount = 0;
    let errorCount = 0;

    for (const productId of productsWithReviews) {
      try {
        await updateProductRating(productId);
        updatedCount++;
        console.log(`Updated product ${productId}`);
      } catch (error) {
        console.error(`Error updating product ${productId}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\nUpdate complete!`);
    console.log(`Successfully updated: ${updatedCount} products`);
    console.log(`Errors: ${errorCount} products`);

    return { updatedCount, errorCount };
  } catch (error) {
    console.error('Error in updateAllProductRatings:', error);
    throw error;
  }
};

/**
 * Get rating statistics for all products
 */
exports.getRatingStats = async () => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          avgRating: { $avg: '$averageRating' },
          totalReviews: { $sum: '$numReviews' },
          productsWithReviews: {
            $sum: { $cond: [{ $gt: ['$numReviews', 0] }, 1, 0] },
          },
        },
      },
    ]);

    return (
      stats[0] || {
        totalProducts: 0,
        avgRating: 0,
        totalReviews: 0,
        productsWithReviews: 0,
      }
    );
  } catch (error) {
    console.error('Error getting rating stats:', error);
    throw error;
  }
};

// Run the update if this file is executed directly
if (require.main === module) {
  const mongoose = require('mongoose');
  require('dotenv').config();

  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('Connected to MongoDB');
      await exports.updateAllProductRatings();
      const stats = await exports.getRatingStats();
      console.log('\nRating Statistics:', stats);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database connection error:', error);
      process.exit(1);
    });
}
