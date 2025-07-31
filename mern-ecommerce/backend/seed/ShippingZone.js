const ShippingZone = require('../models/ShippingZone');

const shippingZones = [
  {
    name: 'Local Zone',
    description: 'Same city delivery',
    cities: ['New York', 'NYC', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
    states: ['New York'],
    countries: ['US'],
    standardPrice: 5.99,
    expressPrice: 12.99,
    isActive: true,
    estimatedDays: {
      standard: 2,
      express: 1,
    },
  },
  {
    name: 'Regional Zone',
    description: 'Same state delivery',
    states: ['New York', 'New Jersey', 'Connecticut', 'Pennsylvania'],
    countries: ['US'],
    standardPrice: 9.99,
    expressPrice: 19.99,
    isActive: true,
    estimatedDays: {
      standard: 3,
      express: 1,
    },
  },
  {
    name: 'National Zone',
    description: 'US mainland delivery',
    countries: ['US'],
    standardPrice: 14.99,
    expressPrice: 29.99,
    isActive: true,
    estimatedDays: {
      standard: 5,
      express: 2,
    },
  },
  {
    name: 'International Zone',
    description: 'International delivery',
    countries: ['CA', 'MX', 'UK', 'DE', 'FR', 'AU'],
    standardPrice: 49.99,
    expressPrice: 89.99,
    isActive: true,
    estimatedDays: {
      standard: 10,
      express: 3,
    },
  },
];

const seedShippingZones = async () => {
  try {
    // Clear existing shipping zones
    await ShippingZone.deleteMany({});

    // Insert new shipping zones
    const createdZones = await ShippingZone.insertMany(shippingZones);

    console.log(`✅ ${createdZones.length} shipping zones seeded successfully`);
    return createdZones;
  } catch (error) {
    console.error('❌ Error seeding shipping zones:', error);
    throw error;
  }
};

module.exports = { seedShippingZones };
