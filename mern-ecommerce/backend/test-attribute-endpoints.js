const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🔍 Testing: ${description}`);
    console.log(`📍 Endpoint: ${endpoint}`);

    const response = await axios.get(`${BASE_URL}${endpoint}`);
    console.log('✅ Success!');
    console.log(`📊 Response:`, JSON.stringify(response.data, null, 2));

    if (response.data.data && Array.isArray(response.data.data)) {
      console.log(`📦 Products returned: ${response.data.data.length}`);
    }
  } catch (error) {
    console.log('❌ Error:');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Data:`, JSON.stringify(error.response.data, null, 2));
    } else {
      console.log(`Message: ${error.message}`);
    }
  }
}

async function testAllEndpoints() {
  console.log('🚀 Testing Attribute-Based Product Endpoints\n');

  const endpoints = [
    { path: '/products/featured', desc: 'Featured Products' },
    { path: '/products/top-sellers', desc: 'Top Sellers' },
    { path: '/products/new-arrivals', desc: 'New Arrivals' },
    { path: '/products/best-deals', desc: 'Best Deals' },
    { path: '/products/flash-deals', desc: 'Flash Deals' },
    { path: '/products/trending', desc: 'Trending Products' },
  ];

  for (const endpoint of endpoints) {
    await testEndpoint(endpoint.path, endpoint.desc);
    // Small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n🎯 Testing complete!');
}

// Run the tests
testAllEndpoints().catch(console.error);
