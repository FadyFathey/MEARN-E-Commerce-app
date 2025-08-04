const Product = require('../models/Product');
const Category = require('../models/Category');
const { connectToDB } = require('../database/db');
const { seedDiverseProducts } = require('./seedDiverseProducts');
const { seedCategory } = require('./Category');

const clearAndSeed = async () => {
  try {
    console.log('🧹 Starting clear and seed process...');

    // Connect to database
    console.log('🔌 Connecting to database...');
    await connectToDB();

    // Wait for connection to stabilize
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear existing categories
    console.log('🗑️ Clearing existing categories...');
    const catDeleteResult = await Category.deleteMany({});
    console.log(`✅ Deleted ${catDeleteResult.deletedCount} existing categories`);

    // Seed new categories
    console.log('🌱 Seeding new categories...');
    await seedCategory();

    // Wait a moment
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear existing products
    console.log('🗑️ Clearing existing products...');
    const deleteResult = await Product.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing products`);

    // Wait a moment
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Seed new products
    console.log('🌱 Seeding new diverse products...');
    await seedDiverseProducts();

    console.log('🎉 Clear and seed completed successfully!');
  } catch (error) {
    console.error('❌ Error in clear and seed process:', error);
  }
};

// Run if called directly
if (require.main === module) {
  clearAndSeed()
    .then(() => {
      console.log('✅ Process completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Process failed:', error);
      process.exit(1);
    });
}

module.exports = { clearAndSeed };
