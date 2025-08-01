const mongoose = require('mongoose');
const Product = require('./models/Product');

// Test configuration
const TEST_CONFIG = {
  dbUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce',
  testProductId: '65a7e45902e12c44f599444e', // iPhone 9
};

async function testProductAttributes() {
  try {
    console.log('🧪 Starting Product Attributes Test Suite...\n');

    // Test 1: Check if new fields exist in product schema
    console.log('1️⃣ Testing Product Schema...');
    const testProduct = await Product.findById(TEST_CONFIG.testProductId);
    if (!testProduct) {
      console.log('❌ Test product not found. Please run the seed script first.');
      return;
    }

    const requiredFields = [
      'isFeatured',
      'isTopSeller',
      'isNewArrival',
      'isBestDeal',
      'isLimitedStock',
      'isFlashDeal',
      'isTrending',
      'tags',
      'badges',
      'priorityScore',
    ];

    const missingFields = requiredFields.filter((field) => !(field in testProduct));
    if (missingFields.length > 0) {
      console.log(`❌ Missing fields: ${missingFields.join(', ')}`);
    } else {
      console.log('✅ All required fields present in product schema');
    }

    // Test 2: Test filtering by attributes
    console.log('\n2️⃣ Testing Product Filtering...');

    const featuredProducts = await Product.find({ isFeatured: true });
    console.log(`✅ Found ${featuredProducts.length} featured products`);

    const topSellers = await Product.find({ isTopSeller: true });
    console.log(`✅ Found ${topSellers.length} top sellers`);

    const newArrivals = await Product.find({ isNewArrival: true });
    console.log(`✅ Found ${newArrivals.length} new arrivals`);

    const bestDeals = await Product.find({ isBestDeal: true });
    console.log(`✅ Found ${bestDeals.length} best deals`);

    const flashDeals = await Product.find({ isFlashDeal: true });
    console.log(`✅ Found ${flashDeals.length} flash deals`);

    const trendingProducts = await Product.find({ isTrending: true });
    console.log(`✅ Found ${trendingProducts.length} trending products`);

    const limitedStockProducts = await Product.find({ isLimitedStock: true });
    console.log(`✅ Found ${limitedStockProducts.length} limited stock products`);

    // Test 3: Test tag filtering
    console.log('\n3️⃣ Testing Tag Filtering...');
    const smartphoneProducts = await Product.find({ tags: { $in: ['Smartphone'] } });
    console.log(`✅ Found ${smartphoneProducts.length} products with 'Smartphone' tag`);

    const appleProducts = await Product.find({ tags: { $in: ['Apple'] } });
    console.log(`✅ Found ${appleProducts.length} products with 'Apple' tag`);

    // Test 4: Test priority score sorting
    console.log('\n4️⃣ Testing Priority Score Sorting...');
    const sortedProducts = await Product.find({})
      .sort({ priorityScore: -1, createdAt: -1 })
      .limit(5)
      .select('title priorityScore');

    console.log('Top 5 products by priority score:');
    sortedProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.title} (Score: ${product.priorityScore})`);
    });

    // Test 5: Test distinct tags
    console.log('\n5️⃣ Testing Distinct Tags...');
    const allTags = await Product.distinct('tags');
    console.log(`✅ Found ${allTags.length} unique tags: ${allTags.join(', ')}`);

    // Test 6: Test badge display
    console.log('\n6️⃣ Testing Badge Display...');
    const productsWithBadges = await Product.find({ badges: { $exists: true, $ne: [] } });
    console.log(`✅ Found ${productsWithBadges.length} products with badges`);

    productsWithBadges.forEach((product) => {
      console.log(`  - ${product.title}: ${product.badges.join(', ')}`);
    });

    // Test 7: Test complex queries
    console.log('\n7️⃣ Testing Complex Queries...');

    // Featured products with high priority
    const highPriorityFeatured = await Product.find({
      isFeatured: true,
      priorityScore: { $gte: 80 },
    });
    console.log(`✅ Found ${highPriorityFeatured.length} featured products with priority >= 80`);

    // Products with multiple tags
    const multiTagProducts = await Product.find({
      tags: { $size: { $gte: 3 } },
    });
    console.log(`✅ Found ${multiTagProducts.length} products with 3+ tags`);

    // Limited stock with discounts
    const limitedStockWithDiscounts = await Product.find({
      isLimitedStock: true,
      discountPercentage: { $gt: 0 },
    });
    console.log(
      `✅ Found ${limitedStockWithDiscounts.length} limited stock products with discounts`
    );

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Total products: ${await Product.countDocuments()}`);
    console.log(`- Featured products: ${featuredProducts.length}`);
    console.log(`- Top sellers: ${topSellers.length}`);
    console.log(`- New arrivals: ${newArrivals.length}`);
    console.log(`- Best deals: ${bestDeals.length}`);
    console.log(`- Flash deals: ${flashDeals.length}`);
    console.log(`- Trending products: ${trendingProducts.length}`);
    console.log(`- Limited stock: ${limitedStockProducts.length}`);
    console.log(`- Unique tags: ${allTags.length}`);
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests
if (require.main === module) {
  mongoose
    .connect(TEST_CONFIG.dbUrl)
    .then(() => {
      console.log('Connected to MongoDB');
      return testProductAttributes();
    })
    .then(() => {
      console.log('\n✅ Test suite completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Test suite failed:', error);
      process.exit(1);
    });
}

module.exports = { testProductAttributes };
