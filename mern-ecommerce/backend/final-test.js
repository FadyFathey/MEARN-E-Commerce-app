const { spawn } = require('child_process');
const https = require('https');
const http = require('http');

let serverProcess = null;

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

async function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting server...');
    serverProcess = spawn('node', ['index.js'], {
      cwd: __dirname,
      stdio: 'pipe',
    });

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Server [STARTED]')) {
        console.log('✅ Server started successfully!');
        setTimeout(resolve, 3000); // Wait 3 seconds for server to be ready
      }
    });

    serverProcess.stderr.on('data', (data) => {
      console.log('Server Error:', data.toString());
    });

    serverProcess.on('error', (error) => {
      console.error('Failed to start server:', error);
      reject(error);
    });

    setTimeout(() => {
      reject(new Error('Server startup timeout'));
    }, 15000);
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log('\n🎯 Testing complete!');
}

async function cleanup() {
  if (serverProcess) {
    console.log('🛑 Stopping server...');
    serverProcess.kill('SIGTERM');
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
