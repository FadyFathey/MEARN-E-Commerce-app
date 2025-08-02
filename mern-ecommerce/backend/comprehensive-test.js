const axios = require('axios');
const { spawn } = require('child_process');
const path = require('path');

let serverProcess = null;

async function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting server...');
    serverProcess = spawn('node', ['index.js'], {
      cwd: __dirname,
      stdio: 'pipe',
    });

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log('Server:', output);
      if (output.includes('Server [STARTED]')) {
        console.log('✅ Server started successfully!');
        setTimeout(resolve, 2000); // Wait 2 seconds for server to be ready
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.log('Server Error:', data.toString());
    });

    serverProcess.on('error', (error) => {
      console.error('Failed to start server:', error);
      reject(error);
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      reject(new Error('Server startup timeout'));
    }, 10000);
  });
}

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🔍 Testing: ${description}`);
    console.log(`📍 Endpoint: ${endpoint}`);

    const response = await axios.get(`http://localhost:8000${endpoint}`, {
      timeout: 5000,
    });
    console.log('✅ Success!');
    console.log(`📊 Status: ${response.status}`);
    console.log(`📦 Products returned: ${response.data.data?.length || 0}`);

    if (response.data.data && response.data.data.length > 0) {
      console.log(`📋 Sample product: ${response.data.data[0].title}`);
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('\n🎯 Testing complete!');
}

async function cleanup() {
  if (serverProcess) {
    console.log('🛑 Stopping server...');
    serverProcess.kill('SIGTERM');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function main() {
  try {
    await startServer();
    await testAllEndpoints();
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await cleanup();
    process.exit(0);
  }
}

main();
