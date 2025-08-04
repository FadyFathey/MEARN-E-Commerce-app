const axios = require('axios');

async function testSpecializedPagination() {
  try {
    console.log('🧪 Testing Specialized Endpoints Pagination...\n');
    
    const baseUrl = 'http://localhost:8000';
    
    // Test 1: New Arrivals with limit=2
    console.log('Test 1: New Arrivals (page=1, limit=2)');
    try {
      const response1 = await axios.get(`${baseUrl}/products/new-arrivals?page=1&limit=2`);
      console.log('Status:', response1.status);
      console.log('Data length:', response1.data.data.length);
      console.log('Pagination:', response1.data.pagination);
      console.log('X-Total-Count header:', response1.headers['x-total-count']);
      console.log('Expected: 2 products, Got:', response1.data.data.length);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 2: Featured Products with limit=1
    console.log('Test 2: Featured Products (page=1, limit=1)');
    try {
      const response2 = await axios.get(`${baseUrl}/products/featured?page=1&limit=1`);
      console.log('Status:', response2.status);
      console.log('Data length:', response2.data.data.length);
      console.log('Pagination:', response2.data.pagination);
      console.log('Expected: 1 product, Got:', response2.data.data.length);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 3: Top Sellers with limit=3
    console.log('Test 3: Top Sellers (page=1, limit=3)');
    try {
      const response3 = await axios.get(`${baseUrl}/products/top-sellers?page=1&limit=3`);
      console.log('Status:', response3.status);
      console.log('Data length:', response3.data.data.length);
      console.log('Pagination:', response3.data.pagination);
      console.log('Expected: 3 products, Got:', response3.data.data.length);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 4: Best Deals with limit=1
    console.log('Test 4: Best Deals (page=1, limit=1)');
    try {
      const response4 = await axios.get(`${baseUrl}/products/best-deals?page=1&limit=1`);
      console.log('Status:', response4.status);
      console.log('Data length:', response4.data.data.length);
      console.log('Pagination:', response4.data.pagination);
      console.log('Expected: 1 product, Got:', response4.data.data.length);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 5: Flash Deals with limit=2
    console.log('Test 5: Flash Deals (page=1, limit=2)');
    try {
      const response5 = await axios.get(`${baseUrl}/products/flash-deals?page=1&limit=2`);
      console.log('Status:', response5.status);
      console.log('Data length:', response5.data.data.length);
      console.log('Pagination:', response5.data.pagination);
      console.log('Expected: 2 products, Got:', response5.data.data.length);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 6: Trending Products with limit=1
    console.log('Test 6: Trending Products (page=1, limit=1)');
    try {
      const response6 = await axios.get(`${baseUrl}/products/trending?page=1&limit=1`);
      console.log('Status:', response6.status);
      console.log('Data length:', response6.data.data.length);
      console.log('Pagination:', response6.data.pagination);
      console.log('Expected: 1 product, Got:', response6.data.data.length);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 7: Products by Tag with limit=2
    console.log('Test 7: Products by Tag (page=1, limit=2)');
    try {
      const response7 = await axios.get(`${baseUrl}/products/tag/Electronics?page=1&limit=2`);
      console.log('Status:', response7.status);
      console.log('Data length:', response7.data.data.length);
      console.log('Pagination:', response7.data.pagination);
      console.log('Expected: 2 products, Got:', response7.data.data.length);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 8: Second page of New Arrivals
    console.log('Test 8: New Arrivals (page=2, limit=2)');
    try {
      const response8 = await axios.get(`${baseUrl}/products/new-arrivals?page=2&limit=2`);
      console.log('Status:', response8.status);
      console.log('Data length:', response8.data.data.length);
      console.log('Pagination:', response8.data.pagination);
      console.log('Current page should be 2, Got:', response8.data.pagination.currentPage);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    console.log('✅ All specialized pagination tests completed!');
    
  } catch (error) {
    console.log('❌ General Error:', error.message);
  }
}

testSpecializedPagination(); 