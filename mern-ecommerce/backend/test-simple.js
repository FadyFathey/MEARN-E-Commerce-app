const axios = require('axios');

async function testFeatured() {
  try {
    console.log('Testing featured products...');
    const response = await axios.get('http://localhost:8000/products/featured');
    console.log('Success:', response.data);
  } catch (error) {
    console.log('Error:', error.response?.data || error.message);
  }
}

testFeatured();
