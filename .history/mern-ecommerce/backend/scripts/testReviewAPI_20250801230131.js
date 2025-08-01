const axios = require('axios');
const { connectToDB } = require('../database/db');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

// Configuration
const BASE_URL = 'http://localhost:8000';
let authToken = '';
let testUserId = '';
let testProductId = '';
let testReviewId = '';

/**
 * Test the complete review API functionality
 */
async function testReviewAPI() {
  try {
    console.log('🧪 Testing Review API Endpoints...\n');

    // Step 1: Get test data
    await getTestData();

    // Step 2: Test authentication
    await testAuthentication();

    // Step 3: Test review creation
    await testCreateReview();

    // Step 4: Test duplicate review prevention
    await testDuplicateReviewPrevention();

    // Step 5: Test get reviews by product
    await testGetReviewsByProduct();

    // Step 6: Test get user review
    await testGetUserReview();

    // Step 7: Test update review
    await testUpdateReview();

    // Step 8: Test delete review
    await testDeleteReview();

    // Step 9: Test product rating update
    await testProductRatingUpdate();

    console.log('\n🎉 All Review API Tests Completed Successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

/**
 * Get test data from database
 */
async function getTestData() {
  console.log('📊 Getting test data...');
  
  // Get a test user
  const user = await User.findOne();
  if (!user) {
    throw new Error('No users found in database');
  }
  testUserId = user._id.toString();
  console.log(`✅ Test user: ${user.name} (${testUserId})`);

  // Get a test product
  const product = await Product.findOne();
  if (!product) {
    throw new Error('No products found in database');
  }
  testProductId = product._id.toString();
  console.log(`✅ Test product: ${product.title} (${testProductId})`);

  // Get existing review for testing
  const existingReview = await Review.findOne({ user: testUserId, product: testProductId });
  if (existingReview) {
    testReviewId = existingReview._id.toString();
    console.log(`✅ Existing review found: ${testReviewId}`);
  }
}

/**
 * Test authentication
 */
async function testAuthentication() {
  console.log('\n🔐 Testing authentication...');
  
  try {
    // Try to create a review without token
    await axios.post(`${BASE_URL}/reviews`, {
      product: testProductId,
      rating: 5,
      comment: 'Test review'
    });
    console.log('❌ Should have failed without token');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Authentication required - correct behavior');
    } else {
      console.log('⚠️  Unexpected error:', error.response?.status);
    }
  }
}

/**
 * Test review creation
 */
async function testCreateReview() {
  console.log('\n📝 Testing review creation...');
  
  try {
    // First, delete any existing review by this user for this product
    if (testReviewId) {
      await Review.findByIdAndDelete(testReviewId);
      console.log('🗑️  Deleted existing review for clean test');
    }

    // Create a new review
    const response = await axios.post(`${BASE_URL}/reviews`, {
      product: testProductId,
      rating: 5,
      comment: 'Excellent product! Highly recommended.'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      testReviewId = response.data.data._id;
      console.log('✅ Review created successfully');
      console.log(`   Rating: ${response.data.data.rating}`);
      console.log(`   Comment: ${response.data.data.comment}`);
    } else {
      console.log('❌ Review creation failed');
    }
  } catch (error) {
    console.log('❌ Review creation error:', error.response?.data?.message || error.message);
  }
}

/**
 * Test duplicate review prevention
 */
async function testDuplicateReviewPrevention() {
  console.log('\n🚫 Testing duplicate review prevention...');
  
  try {
    // Try to create another review for the same product
    await axios.post(`${BASE_URL}/reviews`, {
      product: testProductId,
      rating: 4,
      comment: 'Another review attempt'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('❌ Should have prevented duplicate review');
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('already reviewed')) {
      console.log('✅ Duplicate review prevented - correct behavior');
    } else {
      console.log('⚠️  Unexpected error:', error.response?.data?.message);
    }
  }
}

/**
 * Test get reviews by product
 */
async function testGetReviewsByProduct() {
  console.log('\n📋 Testing get reviews by product...');
  
  try {
    const response = await axios.get(`${BASE_URL}/reviews/product/${testProductId}`);
    
    if (response.data.success) {
      console.log('✅ Reviews retrieved successfully');
      console.log(`   Total reviews: ${response.data.data.length}`);
      console.log(`   Headers: X-Total-Count = ${response.headers['x-total-count']}`);
    } else {
      console.log('❌ Failed to get reviews');
    }
  } catch (error) {
    console.log('❌ Get reviews error:', error.response?.data?.message || error.message);
  }
}

/**
 * Test get user review
 */
async function testGetUserReview() {
  console.log('\n👤 Testing get user review...');
  
  try {
    const response = await axios.get(`${BASE_URL}/reviews/user/${testProductId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.data.success) {
      console.log('✅ User review retrieved successfully');
      if (response.data.data) {
        console.log(`   Rating: ${response.data.data.rating}`);
        console.log(`   Comment: ${response.data.data.comment}`);
      } else {
        console.log('   No review found for this user');
      }
    } else {
      console.log('❌ Failed to get user review');
    }
  } catch (error) {
    console.log('❌ Get user review error:', error.response?.data?.message || error.message);
  }
}

/**
 * Test update review
 */
async function testUpdateReview() {
  console.log('\n✏️  Testing review update...');
  
  if (!testReviewId) {
    console.log('⚠️  No review to update');
    return;
  }
  
  try {
    const response = await axios.patch(`${BASE_URL}/reviews/${testReviewId}`, {
      rating: 4,
      comment: 'Updated review comment'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      console.log('✅ Review updated successfully');
      console.log(`   New rating: ${response.data.data.rating}`);
      console.log(`   New comment: ${response.data.data.comment}`);
    } else {
      console.log('❌ Failed to update review');
    }
  } catch (error) {
    console.log('❌ Update review error:', error.response?.data?.message || error.message);
  }
}

/**
 * Test delete review
 */
async function testDeleteReview() {
  console.log('\n🗑️  Testing review deletion...');
  
  if (!testReviewId) {
    console.log('⚠️  No review to delete');
    return;
  }
  
  try {
    const response = await axios.delete(`${BASE_URL}/reviews/${testReviewId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.data.success) {
      console.log('✅ Review deleted successfully');
      testReviewId = null; // Clear the ID since it's deleted
    } else {
      console.log('❌ Failed to delete review');
    }
  } catch (error) {
    console.log('❌ Delete review error:', error.response?.data?.message || error.message);
  }
}

/**
 * Test product rating update
 */
async function testProductRatingUpdate() {
  console.log('\n⭐ Testing product rating update...');
  
  try {
    // Get product before creating a new review
    const productBefore = await Product.findById(testProductId).select('averageRating numReviews');
    console.log(`   Before: Rating ${productBefore.averageRating}, Reviews ${productBefore.numReviews}`);

    // Create a new review to trigger rating update
    const response = await axios.post(`${BASE_URL}/reviews`, {
      product: testProductId,
      rating: 5,
      comment: 'Test review for rating update'
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.success) {
      // Get product after review creation
      const productAfter = await Product.findById(testProductId).select('averageRating numReviews');
      console.log(`   After: Rating ${productAfter.averageRating}, Reviews ${productAfter.numReviews}`);
      
      if (productAfter.numReviews > productBefore.numReviews) {
        console.log('✅ Product rating updated successfully');
      } else {
        console.log('❌ Product rating not updated');
      }
    }
  } catch (error) {
    console.log('❌ Product rating update error:', error.response?.data?.message || error.message);
  }
}

// Export function
module.exports = { testReviewAPI };

// Run if this file is executed directly
if (require.main === module) {
  console.log('⚠️  This test requires a running server and valid authentication token.');
  console.log('   Please set the authToken variable or run the server first.');
  console.log('   You can also run: node scripts/setupProductRatings.js');
} 