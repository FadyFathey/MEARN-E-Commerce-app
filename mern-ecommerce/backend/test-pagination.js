const axios = require('axios');

async function testPagination() {
  try {
    console.log('Testing pagination functionality...\n');

    // Test 1: Basic pagination
    console.log('Test 1: Basic pagination (page=1, limit=5)');
    const response1 = await axios.get('http://localhost:8000/products?page=1&limit=5');
    console.log('Status:', response1.status);
    console.log('Data length:', response1.data.data.length);
    console.log('Pagination:', response1.data.pagination);
    console.log('X-Total-Count header:', response1.headers['x-total-count']);
    console.log('');

    // Test 2: Second page
    console.log('Test 2: Second page (page=2, limit=5)');
    const response2 = await axios.get('http://localhost:8000/products?page=2&limit=5');
    console.log('Status:', response2.status);
    console.log('Data length:', response2.data.data.length);
    console.log('Pagination:', response2.data.pagination);
    console.log('');

    // Test 3: With search and filters
    console.log('Test 3: With search and filters');
    const response3 = await axios.get(
      'http://localhost:8000/products?page=1&limit=3&search=shirt&sort=price&order=asc'
    );
    console.log('Status:', response3.status);
    console.log('Data length:', response3.data.data.length);
    console.log('Pagination:', response3.data.pagination);
    console.log('');

    // Test 4: Invalid pagination parameters (should use defaults)
    console.log('Test 4: Invalid pagination parameters');
    const response4 = await axios.get('http://localhost:8000/products?page=-1&limit=0');
    console.log('Status:', response4.status);
    console.log('Data length:', response4.data.data.length);
    console.log('Pagination:', response4.data.pagination);
    console.log('');

    console.log('✅ All pagination tests completed successfully!');
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }
}

testPagination();
