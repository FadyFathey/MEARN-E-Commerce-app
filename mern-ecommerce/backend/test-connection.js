require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB connection successful!');
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('Connection closed.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(error.message);
    
    if (error.message.includes('buffering timed out')) {
      console.log('\n🔍 Possible solutions:');
      console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('2. Check if the cluster is running');
      console.log('3. Check your internet connection');
      console.log('4. Try using a different network');
    }
  }
}

testConnection(); 