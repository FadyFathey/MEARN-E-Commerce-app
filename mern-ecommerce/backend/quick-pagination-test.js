const axios = require('axios');

async function quickTest() {
  try {
    console.log('🔍 Quick Pagination Test...\n');
    
    const baseUrl = 'http://localhost:8000';
    
    // Test 1: Check if server is running
    console.log('Test 1: Server connectivity');
    try {
      const response = await axios.get(`${baseUrl}/products/new-arrivals`);
      console.log('✅ Server is running');
      console.log('Status:', response.status);
      console.log('Response has pagination:', !!response.data.pagination);
      console.log('Data length:', response.data.data.length);
      console.log('Pagination object:', response.data.pagination);
      console.log('');
    } catch (error) {
      console.log('❌ Server not running or error:', error.message);
      return;
    }
    
    // Test 2: Test with limit=2
    console.log('Test 2: New Arrivals with limit=2');
    try {
      const response = await axios.get(`${baseUrl}/products/new-arrivals?page=1&limit=2`);
      console.log('Status:', response.status);
      console.log('Data length:', response.data.data.length);
      console.log('Expected: 2, Got:', response.data.data.length);
      console.log('Pagination:', response.data.pagination);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 3: Test with limit=1
    console.log('Test 3: New Arrivals with limit=1');
    try {
      const response = await axios.get(`${baseUrl}/products/new-arrivals?page=1&limit=1`);
      console.log('Status:', response.status);
      console.log('Data length:', response.data.data.length);
      console.log('Expected: 1, Got:', response.data.data.length);
      console.log('Pagination:', response.data.pagination);
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
    // Test 4: Check total count
    console.log('Test 4: Check total count');
    try {
      const response = await axios.get(`${baseUrl}/products/new-arrivals`);
      const totalProducts = response.data.pagination.totalProducts;
      console.log('Total new arrival products:', totalProducts);
      
      if (totalProducts > 2) {
        console.log('✅ Should support pagination');
      } else {
        console.log('⚠️  Only', totalProducts, 'products available - pagination may not be visible');
      }
      console.log('');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.log('❌ General Error:', error.message);
  }
}

quickTest(); 