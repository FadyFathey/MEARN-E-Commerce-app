const mongoose = require('mongoose');
const Product = require('./models/Product');
const { connectToDB } = require('./database/db');

async function debugProducts() {
  try {
    console.log('🔌 Connecting to database...');
    await connectToDB();

    console.log('\n📊 Checking product attributes in database...');

    // Check total products
    const totalProducts = await Product.countDocuments();
    console.log(`📦 Total products: ${totalProducts}`);

    // Check products with each attribute
    const featuredCount = await Product.countDocuments({ isFeatured: true });
    const topSellerCount = await Product.countDocuments({ isTopSeller: true });
    const newArrivalCount = await Product.countDocuments({ isNewArrival: true });
    const bestDealCount = await Product.countDocuments({ isBestDeal: true });
    const flashDealCount = await Product.countDocuments({ isFlashDeal: true });
    const trendingCount = await Product.countDocuments({ isTrending: true });

    console.log(`⭐ Featured products: ${featuredCount}`);
    console.log(`🔥 Top sellers: ${topSellerCount}`);
    console.log(`🆕 New arrivals: ${newArrivalCount}`);
    console.log(`💰 Best deals: ${bestDealCount}`);
    console.log(`⚡ Flash deals: ${flashDealCount}`);
    console.log(`📈 Trending: ${trendingCount}`);

    // Show a few sample products with their attributes
    console.log('\n🔍 Sample products with attributes:');
    const sampleProducts = await Product.find({
      $or: [
        { isFeatured: true },
        { isTopSeller: true },
        { isNewArrival: true },
        { isBestDeal: true },
        { isFlashDeal: true },
        { isTrending: true },
      ],
    })
      .limit(5)
      .select('title isFeatured isTopSeller isNewArrival isBestDeal isFlashDeal isTrending');

    sampleProducts.forEach((product) => {
      console.log(`📦 ${product.title}`);
      console.log(
        `   Featured: ${product.isFeatured}, TopSeller: ${product.isTopSeller}, NewArrival: ${product.isNewArrival}`
      );
      console.log(
        `   BestDeal: ${product.isBestDeal}, FlashDeal: ${product.isFlashDeal}, Trending: ${product.isTrending}`
      );
    });

    // Test the controller methods directly
    console.log('\n🧪 Testing controller methods directly...');

    try {
      const featuredProducts = await Product.find({ isFeatured: true, isDeleted: false })
        .sort({ priorityScore: -1, createdAt: -1 })
        .populate('brand')
        .populate('category')
        .limit(10);
      console.log(
        `✅ Featured products query successful: ${featuredProducts.length} products found`
      );
    } catch (error) {
      console.log(`❌ Featured products query failed:`, error.message);
    }

    try {
      const topSellers = await Product.find({ isTopSeller: true, isDeleted: false })
        .sort({ priorityScore: -1, createdAt: -1 })
        .populate('brand')
        .populate('category')
        .limit(10);
      console.log(`✅ Top sellers query successful: ${topSellers.length} products found`);
    } catch (error) {
      console.log(`❌ Top sellers query failed:`, error.message);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

debugProducts();
