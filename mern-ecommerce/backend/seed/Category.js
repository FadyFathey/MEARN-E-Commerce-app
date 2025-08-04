const Category = require('../models/Category');

const categories = [
  {
    _id: '65a7e24602e12c44f599442c',
    name: 'smartphones',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599442d',
    name: 'laptops',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599442e',
    name: 'fragrances',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599442f',
    name: 'skincare',
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994430',
    name: 'groceries',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994431',
    name: 'home-decoration',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994432',
    name: 'furniture',
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994433',
    name: 'tops',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994434',
    name: 'womens-dresses',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994435',
    name: 'womens-shoes',
    image:
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994436',
    name: 'mens-shirts',
    image:
      'https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994437',
    name: 'mens-shoes',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994438',
    name: 'mens-watches',
    image:
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f5994439',
    name: 'womens-watches',
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599443a',
    name: 'womens-bags',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599443b',
    name: 'womens-jewellery',
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599443c',
    name: 'sunglasses',
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599443d',
    name: 'automotive',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599443e',
    name: 'motorcycle',
    image:
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '65a7e24602e12c44f599443f',
    name: 'lighting',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
];

exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log('Category seeded successfully');
  } catch (error) {
    console.log(error);
  }
};
