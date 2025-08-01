const Product = require('../models/Product');
const mongoose = require('mongoose');

// Sample data for generating realistic product attributes
const sampleTags = [
  'Smartphone',
  'Laptop',
  'Tablet',
  'Headphones',
  'Camera',
  'Gaming',
  'Wireless',
  'Bluetooth',
  'Premium',
  'Budget',
  '4K',
  'HD',
  'Portable',
  'Waterproof',
  'Fast Charging',
  'Long Battery',
  'Compact',
  'Lightweight',
  'Durable',
  'Stylish',
  'Modern',
  'Classic',
  'Trendy',
  'Professional',
  'Student',
  'Business',
  'Gaming',
  'Fitness',
  'Travel',
  'Home',
];

const sampleBadges = [
  'Hot',
  'New',
  'Sale',
  'Limited Time',
  'Best Seller',
  'Trending',
  'Flash Deal',
  'Limited Stock',
  'Free Shipping',
  '20% OFF',
  '30% OFF',
  '50% OFF',
  'Featured',
  'Top Rated',
  'Most Popular',
  "Editor's Choice",
  'Customer Favorite',
  'Premium',
  'Exclusive',
  'Special Offer',
];

const productCategories = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Headphones',
  'Cameras',
  'Gaming',
  'Wearables',
  'Audio',
  'TV & Video',
  'Computers',
  'Accessories',
];

// Function to generate random boolean with weighted probability
function randomBoolean(probability = 0.3) {
  return Math.random() < probability;
}

// Function to get random items from array
function getRandomItems(array, min = 0, max = 3) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to generate realistic product attributes based on product data
function generateProductAttributes(product) {
  const title = product.title?.toLowerCase() || '';
  const description = product.description?.toLowerCase() || '';
  const price = product.price || 0;
  const discountPercentage = product.discountPercentage || 0;
  const stockQuantity = product.stockQuantity || 0;

  // Determine product type from title/description
  const isSmartphone =
    title.includes('phone') ||
    title.includes('iphone') ||
    title.includes('samsung') ||
    title.includes('huawei');
  const isLaptop =
    title.includes('laptop') || title.includes('computer') || title.includes('macbook');
  const isTablet = title.includes('tablet') || title.includes('ipad');
  const isHeadphones =
    title.includes('headphone') || title.includes('earphone') || title.includes('airpod');
  const isGaming = title.includes('gaming') || description.includes('gaming');
  const isPremium = price > 500 || title.includes('premium') || title.includes('pro');
  const isBudget = price < 100;

  // Generate appropriate tags based on product type
  let tags = [];
  if (isSmartphone)
    tags.push(
      ...getRandomItems(['Smartphone', 'Mobile', 'iOS', 'Android', 'Premium', 'Camera'], 2, 4)
    );
  else if (isLaptop)
    tags.push(...getRandomItems(['Laptop', 'Computer', 'Work', 'Professional', 'Portable'], 2, 4));
  else if (isTablet)
    tags.push(...getRandomItems(['Tablet', 'Portable', 'Touch', 'Entertainment'], 2, 4));
  else if (isHeadphones)
    tags.push(...getRandomItems(['Headphones', 'Audio', 'Wireless', 'Bluetooth'], 2, 4));
  else if (isGaming)
    tags.push(...getRandomItems(['Gaming', 'Performance', 'RGB', 'High-End'], 2, 4));
  else tags.push(...getRandomItems(sampleTags, 2, 4));

  // Add category-specific tags
  if (isPremium) tags.push('Premium');
  if (isBudget) tags.push('Budget');
  if (discountPercentage > 10) tags.push('On Sale');

  // Remove duplicates
  tags = [...new Set(tags)];

  // Generate badges based on product characteristics
  let badges = [];
  if (discountPercentage > 20) badges.push('Flash Deal');
  if (discountPercentage > 10) badges.push('Sale');
  if (stockQuantity < 10) badges.push('Limited Stock');
  if (isPremium) badges.push('Premium');
  if (randomBoolean(0.2)) badges.push('Featured');
  if (randomBoolean(0.15)) badges.push('Trending');
  if (randomBoolean(0.1)) badges.push('Hot');

  // Remove duplicates
  badges = [...new Set(badges)];

  // Generate boolean attributes with realistic probabilities
  const attributes = {
    isFeatured: randomBoolean(0.25), // 25% chance
    isTopSeller: randomBoolean(0.3), // 30% chance
    isNewArrival: randomBoolean(0.2), // 20% chance
    isBestDeal: discountPercentage > 15, // Based on discount
    isLimitedStock: stockQuantity < 15, // Based on stock
    isFlashDeal: discountPercentage > 25, // Based on discount
    isTrending: randomBoolean(0.25), // 25% chance
    tags: tags,
    badges: badges,
    priorityScore: Math.floor(Math.random() * 100) + 1, // 1-100
  };

  // Adjust priority score based on attributes
  if (attributes.isFeatured) attributes.priorityScore += 20;
  if (attributes.isTopSeller) attributes.priorityScore += 15;
  if (attributes.isTrending) attributes.priorityScore += 10;
  if (attributes.isBestDeal) attributes.priorityScore += 15;
  if (attributes.isFlashDeal) attributes.priorityScore += 25;
  if (attributes.isLimitedStock) attributes.priorityScore += 5;

  // Cap priority score at 100
  attributes.priorityScore = Math.min(attributes.priorityScore, 100);

  return attributes;
}

async function updateProductAttributes() {
  try {
    console.log('🚀 Starting Product Attributes Update...');
    console.log('📊 Fetching all products from database...\n');

    // Fetch all products from database
    const allProducts = await Product.find({ isDeleted: { $ne: true } });

    if (allProducts.length === 0) {
      console.log(
        '❌ No products found in database. Please ensure products exist before running this script.'
      );
      return;
    }

    console.log(`✅ Found ${allProducts.length} products to update\n`);

    let updatedCount = 0;
    let featuredCount = 0;
    let topSellersCount = 0;
    let newArrivalsCount = 0;
    let bestDealsCount = 0;
    let flashDealsCount = 0;
    let trendingCount = 0;
    let limitedStockCount = 0;

    // Update each product with generated attributes
    for (const product of allProducts) {
      try {
        const attributes = generateProductAttributes(product);

        // Update the product
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
          console.log(`   Tags: ${attributes.tags.join(', ')}`);
          console.log(`   Badges: ${attributes.badges.join(', ')}`);
        } else {
          console.log(`❌ Failed to update: ${product.title}`);
        }
      } catch (error) {
        console.log(`❌ Error updating ${product.title}: ${error.message}`);
      }
    }

    console.log('\n🎉 Product Attributes Update Completed!');
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

    // Display some sample products with their new attributes
    console.log('\n🔍 Sample Updated Products:');
    const sampleProducts = await Product.find({})
      .sort({ priorityScore: -1 })
      .limit(5)
      .select('title isFeatured isTopSeller priorityScore tags badges');

    sampleProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title}`);
      console.log(
        `   Priority: ${product.priorityScore} | Featured: ${product.isFeatured} | Top Seller: ${product.isTopSeller}`
      );
      console.log(`   Tags: ${product.tags.join(', ')}`);
      console.log(`   Badges: ${product.badges.join(', ')}`);
      console.log('');
    });

    console.log('🎯 Ready for frontend integration!');
    console.log('💡 You can now use the new API endpoints:');
    console.log('   - GET /api/products/featured');
    console.log('   - GET /api/products/top-sellers');
    console.log('   - GET /api/products/new-arrivals');
    console.log('   - GET /api/products/best-deals');
    console.log('   - GET /api/products/flash-deals');
    console.log('   - GET /api/products/trending');
    console.log('   - GET /api/products/tags');
  } catch (error) {
    console.error('❌ Error during product attributes update:', error);
    throw error;
  }
}

// Export for use in other files
module.exports = { updateProductAttributes };

// Run directly if this file is executed
if (require.main === module) {
  // Connect to database and run update
  const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-ecommerce';

  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('🔗 Connected to MongoDB');
      return updateProductAttributes();
    })
    .then(() => {
      console.log('\n✅ Update completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}
