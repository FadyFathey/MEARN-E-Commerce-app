const https = require('https');
const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function testEndpoint(path, description) {
  try {
    console.log(`\n🔍 Testing: ${description}`);
    console.log(`📍 Endpoint: ${path}`);

    const result = await makeRequest(`http://localhost:8000${path}`);
    console.log('✅ Success!');
    console.log(`📊 Status: ${result.status}`);

    if (result.data.success) {
      console.log(`📦 Products returned: ${result.data.data?.length || 0}`);
      if (result.data.data && result.data.data.length > 0) {
        console.log(`📋 Sample product: ${result.data.data[0].title}`);
      }
    } else {
      console.log(`❌ API Error: ${result.data.message}`);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function main() {
  console.log('🚀 Quick Test of Attribute-Based Product Endpoints\n');

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
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n🎯 Quick test complete!');
}

main().catch(console.error);
