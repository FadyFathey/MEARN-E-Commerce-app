const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Brand = require('./models/Brand');

// Simple test product data
const testProduct = {
  title: 'Test Product',
  description: 'A test product for demonstration',
  price: 99.99,
  discountPercentage: 10,
  stockQuantity: 25,
  slug: 'test-product',
  thumbnail: 'https://example.com/test.jpg',
  images: ['https://example.com/test1.jpg'],
  variants: [{ color: 'Black', size: 'Standard', quantity: 25, sku: 'TEST-001' }],
};

// Function to generate random boolean with weighted probability
function randomBoolean(probability = 0.3) {
  return Math.random() < probability;
}

// Function to generate product attributes
function generateAttributes() {
  return {
    isFeatured: randomBoolean(0.3),
    isTopSeller: randomBoolean(0.4),
    isNewArrival: randomBoolean(0.2),
    isBestDeal: randomBoolean(0.3),
    isLimitedStock: randomBoolean(0.2),
    isFlashDeal: randomBoolean(0.1),
    isTrending: randomBoolean(0.3),
    tags: ['Electronics', 'Test', 'Demo'],
    badges: ['New', 'Featured'],
    priorityScore: Math.floor(Math.random() * 100) + 1,
  };
}

async function finalSeed() {
  try {
    console.log('🚀 Starting Final Database Setup...');

    // Connect to database
    const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce';
    await mongoose.connect(dbUrl);
    console.log('✅ Connected to MongoDB');

    // Check if we have categories and brands
    const categories = await Category.find({});
    const brands = await Brand.find({});

    console.log(`📂 Found ${categories.length} categories`);
    console.log(`🏷️ Found ${brands.length} brands`);

    // Check existing products
    const existingProducts = await Product.find({});
    console.log(`📦 Found ${existingProducts.length} existing products`);

    let productsToUpdate = [];

    if (existingProducts.length === 0) {
      console.log('📝 No products found. Creating test products...');

      // Create test products if none exist
      if (categories.length === 0 || brands.length === 0) {
        console.log('⚠️ No categories or brands found. Creating basic ones...');

        // Create a basic category and brand
        const category = await Category.create({ name: 'Electronics' });
        const brand = await Brand.create({ name: 'TestBrand' });

        console.log('✅ Created basic category and brand');

        // Create 5 test products
        for (let i = 1; i <= 5; i++) {
          const product = await Product.create({
            ...testProduct,
            title: `Test Product ${i}`,
            slug: `test-product-${i}`,
            category: category._id,
            brand: brand._id,
            price: 50 + i * 25,
            discountPercentage: i * 5,
          });
          productsToUpdate.push(product);
        }

        console.log('✅ Created 5 test products');
      } else {
        // Use existing categories and brands
        for (let i = 1; i <= 5; i++) {
          const product = await Product.create({
            ...testProduct,
            title: `Test Product ${i}`,
            slug: `test-product-${i}`,
            category: categories[i % categories.length]._id,
            brand: brands[i % brands.length]._id,
            price: 50 + i * 25,
            discountPercentage: i * 5,
          });
          productsToUpdate.push(product);
        }

        console.log('✅ Created 5 test products using existing categories/brands');
      }
    } else {
      // Use existing products
      productsToUpdate = existingProducts;
      console.log('📝 Using existing products for attribute updates');
    }

    // Update all products with attributes
    console.log('🎯 Updating products with new attributes...');

    let updatedCount = 0;
    let featuredCount = 0;
    let topSellersCount = 0;
    let newArrivalsCount = 0;
    let bestDealsCount = 0;
    let flashDealsCount = 0;
    let trendingCount = 0;
    let limitedStockCount = 0;

    for (const product of productsToUpdate) {
      try {
        const attributes = generateAttributes();

        const updatedProduct = await Product.findByIdAndUpdate(
          product._id,
          { $set: attributes },
          { new: true }
        );

        if (updatedProduct) {
          updatedCount++;

          // Count attributes for summary
          if (attributes.isFeatured) featuredCount++;
          if (attributes.isTopSeller) topSellersCount++;
          if (attributes.isNewArrival) newArrivalsCount++;
          if (attributes.isBestDeal) bestDealsCount++;
          if (attributes.isFlashDeal) flashDealsCount++;
          if (attributes.isTrending) trendingCount++;
          if (attributes.isLimitedStock) limitedStockCount++;

          console.log(`✅ Updated: ${product.title} (Priority: ${attributes.priorityScore})`);
          console.log(
            `   Featured: ${attributes.isFeatured} | Top Seller: ${attributes.isTopSeller} | Trending: ${attributes.isTrending}`
          );
        }
      } catch (error) {
        console.log(`❌ Error updating ${product.title}: ${error.message}`);
      }
    }

    console.log('\n🎉 Database Setup Complete!');
    console.log('=' * 50);
    console.log(`✅ Successfully updated ${updatedCount} products.`);
    console.log('\n📊 Attribute Distribution:');
    console.log(`- Featured: ${featuredCount}`);
    console.log(`- Top Sellers: ${topSellersCount}`);
    console.log(`- New Arrivals: ${newArrivalsCount}`);
    console.log(`- Best Deals: ${bestDealsCount}`);
    console.log(`- Flash Deals: ${flashDealsCount}`);
    console.log(`- Trending: ${trendingCount}`);
    console.log(`- Limited Stock: ${limitedStockCount}`);

    // Show final product count
    const finalProductCount = await Product.countDocuments();
    console.log(`\n📦 Total products in database: ${finalProductCount}`);

    // Display sample products
    console.log('\n🔍 Sample Products:');
    const sampleProducts = await Product.find({})
      .populate('category', 'name')
      .populate('brand', 'name')
      .sort({ priorityScore: -1 })
      .limit(3)
      .select('title isFeatured isTopSeller priorityScore tags badges category brand');

    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(`   Category: ${product.category?.name} | Brand: ${product.brand?.name}`);
      console.log(
        `   Priority: ${product.priorityScore} | Featured: ${product.isFeatured} | Top Seller: ${product.isTopSeller}`
      );
      console.log(`   Tags: ${product.tags.join(', ')}`);
      console.log(`   Badges: ${product.badges.join(', ')}`);
      console.log('');
    });

    console.log('🎯 Database is ready for frontend integration!');
    console.log('💡 You can now test the new API endpoints:');
    console.log('   - GET /api/products/featured');
    console.log('   - GET /api/products/top-sellers');
    console.log('   - GET /api/products/new-arrivals');
    console.log('   - GET /api/products/best-deals');
    console.log('   - GET /api/products/flash-deals');
    console.log('   - GET /api/products/trending');
    console.log('   - GET /api/products/tags');
  } catch (error) {
    console.error('❌ Error during database setup:', error);
  } finally {
    try {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    } catch (error) {
      console.log('⚠️ Error disconnecting:', error.message);
    }
  }
}

// Run the script
finalSeed();
