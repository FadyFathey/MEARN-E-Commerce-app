const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const checkProducts = async () => {
  try {
    console.log('🔌 Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to database');

    // Check total products
    const totalProducts = await Product.countDocuments();
    console.log(`📊 Total products in database: ${totalProducts}`);

    // Check non-deleted products
    const activeProducts = await Product.countDocuments({ isDeleted: { $ne: true } });
    console.log(`✅ Active products (not deleted): ${activeProducts}`);

    // Check deleted products
    const deletedProducts = await Product.countDocuments({ isDeleted: true });
    console.log(`🗑️ Deleted products: ${deletedProducts}`);

    // Get sample products
    const sampleProducts = await Product.find().limit(5);
    console.log('\n📋 Sample products:');
    sampleProducts.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.title} (ID: ${product._id}) - Deleted: ${product.isDeleted}`
      );
    });

    // Check if any products have isDeleted field
    const productsWithIsDeleted = await Product.find({ isDeleted: { $exists: true } });
    console.log(`\n🔍 Products with isDeleted field: ${productsWithIsDeleted.length}`);

    // Check products without isDeleted field
    const productsWithoutIsDeleted = await Product.find({ isDeleted: { $exists: false } });
    console.log(`🔍 Products without isDeleted field: ${productsWithoutIsDeleted.length}`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

checkProducts();
