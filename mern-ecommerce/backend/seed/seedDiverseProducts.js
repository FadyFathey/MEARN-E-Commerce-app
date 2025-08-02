const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const { connectToDB } = require('../database/db');

// Utility function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Utility function to get random item from array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Utility function to get random items from array
const getRandomItems = (array, min = 1, max = 3) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Utility function to generate random date within last 6 months
const getRandomDate = () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
  return new Date(
    sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime())
  );
};

// Product data with diverse categories
const diverseProducts = [
  // 👕 Clothing - T-Shirts
  {
    title: 'Premium Cotton T-Shirt',
    description:
      'Ultra-soft 100% organic cotton t-shirt with a modern fit. Perfect for everyday wear with superior comfort and breathability.',
    price: 29.99,
    category: 'Clothing',
    brand: 'Urban Style',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'White', size: 'S', quantity: 25, sku: 'TS-WH-S' },
      { color: 'White', size: 'M', quantity: 30, sku: 'TS-WH-M' },
      { color: 'White', size: 'L', quantity: 20, sku: 'TS-WH-L' },
      { color: 'Black', size: 'S', quantity: 25, sku: 'TS-BL-S' },
      { color: 'Black', size: 'M', quantity: 30, sku: 'TS-BL-M' },
      { color: 'Black', size: 'L', quantity: 20, sku: 'TS-BL-L' },
    ],
    tags: ['Cotton', 'Casual', 'Comfortable', 'Everyday'],
    badges: ['Premium', 'Organic'],
  },
  {
    title: 'Classic Denim Jeans',
    description:
      'Timeless denim jeans with perfect stretch and comfort. Features a modern slim fit with classic blue wash.',
    price: 79.99,
    category: 'Clothing',
    brand: 'Denim Co',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Blue', size: '30', quantity: 15, sku: 'DJ-BL-30' },
      { color: 'Blue', size: '32', quantity: 20, sku: 'DJ-BL-32' },
      { color: 'Blue', size: '34', quantity: 18, sku: 'DJ-BL-34' },
      { color: 'Black', size: '30', quantity: 12, sku: 'DJ-BK-30' },
      { color: 'Black', size: '32', quantity: 16, sku: 'DJ-BK-32' },
    ],
    tags: ['Denim', 'Classic', 'Slim Fit', 'Stretch'],
    badges: ['Classic', 'Stretch'],
  },
  {
    title: 'Formal Business Shirt',
    description:
      'Professional business shirt made from wrinkle-resistant fabric. Perfect for office wear with a crisp, polished look.',
    price: 59.99,
    category: 'Clothing',
    brand: 'Professional Wear',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'White', size: 'S', quantity: 20, sku: 'BS-WH-S' },
      { color: 'White', size: 'M', quantity: 25, sku: 'BS-WH-M' },
      { color: 'White', size: 'L', quantity: 18, sku: 'BS-WH-L' },
      { color: 'Light Blue', size: 'S', quantity: 15, sku: 'BS-LB-S' },
      { color: 'Light Blue', size: 'M', quantity: 20, sku: 'BS-LB-M' },
    ],
    tags: ['Formal', 'Business', 'Wrinkle-resistant', 'Professional'],
    badges: ['Professional', 'Wrinkle-free'],
  },

  // 📱 Electronics - Phones
  {
    title: 'iPhone 15 Pro',
    description:
      'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features 48MP main camera and USB-C connectivity.',
    price: 999.99,
    category: 'Electronics',
    brand: 'Apple',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Titanium', size: '128GB', quantity: 30, sku: 'IP15P-128-TI' },
      { color: 'Titanium', size: '256GB', quantity: 25, sku: 'IP15P-256-TI' },
      { color: 'Titanium', size: '512GB', quantity: 15, sku: 'IP15P-512-TI' },
    ],
    tags: ['Smartphone', 'Apple', 'iOS', 'Premium', 'Camera'],
    badges: ['New', 'Premium', 'Limited Stock'],
  },
  {
    title: 'Samsung Galaxy S24',
    description:
      'Revolutionary smartphone with AI-powered features, stunning display, and exceptional performance. Includes S Pen compatibility.',
    price: 899.99,
    category: 'Electronics',
    brand: 'Samsung',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Phantom Black', size: '128GB', quantity: 25, sku: 'SGS24-128-PB' },
      { color: 'Phantom Black', size: '256GB', quantity: 20, sku: 'SGS24-256-PB' },
      { color: 'Marble Gray', size: '128GB', quantity: 20, sku: 'SGS24-128-MG' },
    ],
    tags: ['Smartphone', 'Samsung', 'Android', 'AI', 'S Pen'],
    badges: ['AI Powered', 'Premium'],
  },

  // 🎧 Electronics - Headphones
  {
    title: 'Sony WH-1000XM5',
    description:
      'Industry-leading noise-canceling headphones with exceptional sound quality and 30-hour battery life. Perfect for music lovers and travelers.',
    price: 349.99,
    category: 'Electronics',
    brand: 'Sony',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Black', size: 'Standard', quantity: 40, sku: 'SWH-BL-ST' },
      { color: 'Silver', size: 'Standard', quantity: 30, sku: 'SWH-SL-ST' },
    ],
    tags: ['Headphones', 'Noise Canceling', 'Wireless', 'Premium Audio'],
    badges: ['Best Seller', 'Noise Canceling'],
  },
  {
    title: 'Apple AirPods Pro',
    description:
      'Active noise cancellation, transparency mode, and spatial audio. Sweat and water resistant with customizable fit.',
    price: 249.99,
    category: 'Electronics',
    brand: 'Apple',
    images: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    ],
    variants: [{ color: 'White', size: 'Standard', quantity: 50, sku: 'APP-WH-ST' }],
    tags: ['Earbuds', 'Wireless', 'Noise Canceling', 'Apple', 'Spatial Audio'],
    badges: ['Popular', 'Wireless'],
  },

  // ⌚ Electronics - Smartwatches
  {
    title: 'Apple Watch Series 9',
    description:
      'Advanced health monitoring, fitness tracking, and seamless iPhone integration. Features ECG, blood oxygen, and fall detection.',
    price: 399.99,
    category: 'Electronics',
    brand: 'Apple',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Midnight', size: '41mm', quantity: 25, sku: 'AWS9-MD-41' },
      { color: 'Midnight', size: '45mm', quantity: 20, sku: 'AWS9-MD-45' },
      { color: 'Starlight', size: '41mm', quantity: 20, sku: 'AWS9-ST-41' },
    ],
    tags: ['Smartwatch', 'Health', 'Fitness', 'Apple', 'GPS'],
    badges: ['Health', 'Fitness'],
  },

  // 🛋️ Home Appliances - Lamps
  {
    title: 'Modern LED Table Lamp',
    description:
      'Sleek design with adjustable brightness and color temperature. Perfect for reading, working, or creating ambient lighting.',
    price: 89.99,
    category: 'Home Appliances',
    brand: 'Luminaire',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'White', size: 'Standard', quantity: 35, sku: 'TL-WH-ST' },
      { color: 'Black', size: 'Standard', quantity: 30, sku: 'TL-BL-ST' },
    ],
    tags: ['LED', 'Modern', 'Adjustable', 'Table Lamp'],
    badges: ['Modern', 'LED'],
  },

  // ☕ Home Appliances - Coffee Machines
  {
    title: 'Breville Espresso Machine',
    description:
      'Professional-grade espresso machine with built-in grinder and milk frother. Perfect for coffee enthusiasts and home baristas.',
    price: 699.99,
    category: 'Home Appliances',
    brand: 'Breville',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    ],
    variants: [{ color: 'Stainless Steel', size: 'Standard', quantity: 15, sku: 'EM-SS-ST' }],
    tags: ['Espresso', 'Coffee', 'Professional', 'Built-in Grinder'],
    badges: ['Professional', 'Premium'],
  },

  // 🧴 Beauty - Perfume
  {
    title: 'Chanel N°5 Eau de Parfum',
    description:
      'Timeless fragrance with notes of rose, jasmine, and vanilla. Iconic scent that has defined luxury for generations.',
    price: 129.99,
    category: 'Beauty',
    brand: 'Chanel',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Classic', size: '50ml', quantity: 20, sku: 'CN5-CL-50' },
      { color: 'Classic', size: '100ml', quantity: 15, sku: 'CN5-CL-100' },
    ],
    tags: ['Perfume', 'Luxury', 'Classic', 'Fragrance'],
    badges: ['Luxury', 'Classic'],
  },

  // 🧴 Beauty - Skincare
  {
    title: 'La Mer Moisturizing Cream',
    description:
      'Luxury moisturizing cream with Miracle Broth™. Provides intense hydration and helps reduce the appearance of fine lines.',
    price: 349.99,
    category: 'Beauty',
    brand: 'La Mer',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Classic', size: '30ml', quantity: 25, sku: 'LMC-CL-30' },
      { color: 'Classic', size: '60ml', quantity: 15, sku: 'LMC-CL-60' },
    ],
    tags: ['Skincare', 'Moisturizer', 'Luxury', 'Anti-aging'],
    badges: ['Luxury', 'Premium'],
  },

  // 🧸 Baby Products / Toys
  {
    title: 'LEGO Star Wars Millennium Falcon',
    description:
      'Iconic Star Wars spaceship with 1,329 pieces. Perfect for collectors and Star Wars fans aged 9+.',
    price: 159.99,
    category: 'Toys',
    brand: 'LEGO',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    ],
    variants: [{ color: 'Classic', size: 'Standard', quantity: 30, sku: 'LSW-CL-ST' }],
    tags: ['LEGO', 'Star Wars', 'Collector', 'Building'],
    badges: ['Collector', 'Popular'],
  },

  // 👜 Accessories - Bags
  {
    title: 'Louis Vuitton Neverfull MM',
    description:
      'Iconic tote bag with spacious interior and leather trim. Perfect for everyday use with timeless design.',
    price: 1499.99,
    category: 'Accessories',
    brand: 'Louis Vuitton',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&h=500&fit=crop',
    ],
    variants: [
      { color: 'Monogram', size: 'MM', quantity: 10, sku: 'LVN-MO-MM' },
      { color: 'Damier Azur', size: 'MM', quantity: 8, sku: 'LVN-DA-MM' },
    ],
    tags: ['Luxury', 'Tote', 'Handbag', 'Designer'],
    badges: ['Luxury', 'Designer'],
  },

  // ⌚ Accessories - Watches
  {
    title: 'Rolex Submariner',
    description:
      'Iconic diving watch with automatic movement and water resistance to 300m. Timeless design with exceptional craftsmanship.',
    price: 8999.99,
    category: 'Accessories',
    brand: 'Rolex',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
    ],
    variants: [{ color: 'Black', size: '40mm', quantity: 5, sku: 'RS-BL-40' }],
    tags: ['Luxury', 'Diving', 'Automatic', 'Swiss Made'],
    badges: ['Luxury', 'Limited Stock'],
  },
];

// Generate additional products to reach 50
const generateAdditionalProducts = () => {
  const additionalProducts = [];
  const baseProducts = [...diverseProducts];

  // Categories and brands for variety
  const categories = [
    'Clothing',
    'Electronics',
    'Home Appliances',
    'Beauty',
    'Toys',
    'Accessories',
  ];
  const brands = [
    'Apple',
    'Samsung',
    'Sony',
    'Nike',
    'Adidas',
    'Chanel',
    'Dior',
    'LEGO',
    'Rolex',
    'Urban Style',
  ];

  // Product templates for variety
  const productTemplates = [
    {
      title: 'Wireless Bluetooth Speaker',
      description:
        'Portable speaker with 360-degree sound and 20-hour battery life. Perfect for outdoor activities and parties.',
      price: 89.99,
      category: 'Electronics',
      brand: 'Sony',
      images: [
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop',
      ],
      variants: [
        { color: 'Black', size: 'Standard', quantity: 40, sku: 'WBS-BL-ST' },
        { color: 'White', size: 'Standard', quantity: 35, sku: 'WBS-WH-ST' },
      ],
      tags: ['Wireless', 'Bluetooth', 'Portable', 'Speaker'],
      badges: ['Portable', 'Wireless'],
    },
    {
      title: 'Running Shoes',
      description:
        'Lightweight running shoes with superior cushioning and breathable mesh upper. Perfect for daily runs and training.',
      price: 129.99,
      category: 'Clothing',
      brand: 'Nike',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
      ],
      variants: [
        { color: 'White', size: '8', quantity: 25, sku: 'RS-WH-8' },
        { color: 'White', size: '9', quantity: 30, sku: 'RS-WH-9' },
        { color: 'White', size: '10', quantity: 25, sku: 'RS-WH-10' },
        { color: 'Black', size: '8', quantity: 20, sku: 'RS-BL-8' },
        { color: 'Black', size: '9', quantity: 25, sku: 'RS-BL-9' },
      ],
      tags: ['Running', 'Athletic', 'Lightweight', 'Cushioned'],
      badges: ['Athletic', 'Lightweight'],
    },
    {
      title: 'Smart Home Hub',
      description:
        'Central control hub for all your smart home devices. Compatible with Alexa, Google Assistant, and Apple HomeKit.',
      price: 199.99,
      category: 'Electronics',
      brand: 'Samsung',
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop',
      ],
      variants: [{ color: 'White', size: 'Standard', quantity: 30, sku: 'SHH-WH-ST' }],
      tags: ['Smart Home', 'Hub', 'IoT', 'Automation'],
      badges: ['Smart', 'IoT'],
    },
  ];

  // Generate 35 more products (50 - 15 base products)
  for (let i = 0; i < 35; i++) {
    const template = getRandomItem(productTemplates);
    const category = getRandomItem(categories);
    const brand = getRandomItem(brands);

    // Create variations of templates
    const product = {
      title: `${template.title} ${i + 1}`,
      description: template.description,
      price: template.price + (Math.random() * 50 - 25), // Vary price by ±25
      category: category,
      brand: brand,
      images: template.images,
      variants: template.variants.map((v) => ({
        ...v,
        sku: `${v.sku}-${i + 1}`,
        quantity: Math.floor(Math.random() * 30) + 10,
      })),
      tags: [...template.tags, category],
      badges: template.badges,
    };

    additionalProducts.push(product);
  }

  return additionalProducts;
};

// Main seeding function
const seedDiverseProducts = async () => {
  try {
    console.log('🌱 Starting diverse products seeding...');

    // Connect to database first
    console.log('🔌 Connecting to database...');
    await connectToDB();

    // Wait a moment for connection to stabilize
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('🔍 Checking existing products...');
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log('⚠️ Products already exist in database. Skipping seeding.');
      console.log(`📊 Current product count: ${existingProducts}`);
      return;
    }

    // Create missing categories and brands
    console.log('🏷️ Creating missing categories and brands...');

    const requiredCategories = [
      'Clothing',
      'Electronics',
      'Home Appliances',
      'Beauty',
      'Toys',
      'Accessories',
    ];

    const requiredBrands = [
      'Apple',
      'Samsung',
      'Sony',
      'Nike',
      'Adidas',
      'Chanel',
      'Dior',
      'LEGO',
      'Rolex',
      'Urban Style',
      'Denim Co',
      'Professional Wear',
      'Luminaire',
      'Breville',
      'La Mer',
    ];

    // Create categories if they don't exist
    for (const catName of requiredCategories) {
      const existingCat = await Category.findOne({ name: { $regex: new RegExp(catName, 'i') } });
      if (!existingCat) {
        await Category.create({ name: catName });
        console.log(`✅ Created category: ${catName}`);
      }
    }

    // Create brands if they don't exist
    for (const brandName of requiredBrands) {
      const existingBrand = await Brand.findOne({ name: { $regex: new RegExp(brandName, 'i') } });
      if (!existingBrand) {
        await Brand.create({ name: brandName });
        console.log(`✅ Created brand: ${brandName}`);
      }
    }

    // Get all categories and brands for mapping
    const categories = await Category.find({});
    const brands = await Brand.find({});

    console.log(`📂 Found ${categories.length} categories and ${brands.length} brands`);

    // Create category and brand mapping
    const categoryMap = {};
    const brandMap = {};

    categories.forEach((cat) => {
      categoryMap[cat.name.toLowerCase()] = cat._id;
    });

    brands.forEach((brand) => {
      brandMap[brand.name.toLowerCase()] = brand._id;
    });

    // Generate all products
    const allProducts = [...diverseProducts, ...generateAdditionalProducts()];

    // Transform products for database insertion
    const productsToInsert = allProducts.map((product, index) => {
      // Find category and brand IDs
      const categoryId = categoryMap[product.category.toLowerCase()] || categories[0]._id;
      const brandId = brandMap[product.brand.toLowerCase()] || brands[0]._id;

      // Generate additional fields
      const discountPercentage = Math.floor(Math.random() * 30) + 5; // 5-35% discount
      const stockQuantity = product.variants.reduce((sum, v) => sum + v.quantity, 0);
      const averageRating = Math.random() * 2 + 3; // 3-5 stars
      const numReviews = Math.floor(Math.random() * 500) + 10; // 10-510 reviews

      // Generate boolean attributes with weighted probability
      const isFeatured = Math.random() < 0.15; // 15% chance
      const isTopSeller = Math.random() < 0.12; // 12% chance
      const isNewArrival = Math.random() < 0.08; // 8% chance
      const isBestDeal = discountPercentage > 20; // Based on discount
      const isLimitedStock = stockQuantity < 30; // Based on stock
      const isFlashDeal = Math.random() < 0.05; // 5% chance
      const isTrending = Math.random() < 0.1; // 10% chance

      // Calculate priority score
      const priorityScore = Math.floor(
        averageRating * 10 +
          discountPercentage * 0.5 +
          (isFeatured ? 20 : 0) +
          (isTopSeller ? 15 : 0) +
          (isNewArrival ? 10 : 0)
      );

      // Generate badges based on attributes
      const generatedBadges = [...product.badges];
      if (discountPercentage > 20) generatedBadges.push(`${discountPercentage}% OFF`);
      if (isLimitedStock) generatedBadges.push('Limited Stock');
      if (isNewArrival) generatedBadges.push('New');
      if (isTopSeller) generatedBadges.push('Best Seller');

      return {
        title: product.title,
        description: product.description,
        price: Math.round(product.price * 100) / 100, // Round to 2 decimal places
        discountPercentage: discountPercentage,
        slug: generateSlug(product.title),
        category: categoryId,
        brand: brandId,
        stockQuantity: stockQuantity,
        thumbnail: product.images[0],
        images: product.images,
        variants: product.variants,
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        numReviews: numReviews,
        isFeatured: isFeatured,
        isTopSeller: isTopSeller,
        isNewArrival: isNewArrival,
        isBestDeal: isBestDeal,
        isLimitedStock: isLimitedStock,
        isFlashDeal: isFlashDeal,
        isTrending: isTrending,
        tags: product.tags,
        badges: generatedBadges,
        priorityScore: Math.min(priorityScore, 100), // Cap at 100
        isDeleted: false,
        createdAt: getRandomDate(),
        updatedAt: new Date(),
      };
    });

    // Insert products
    const result = await Product.insertMany(productsToInsert);

    // Generate summary
    const categoryCounts = {};
    const brandCounts = {};

    result.forEach((product) => {
      const category = categories.find((c) => c._id.equals(product.category))?.name || 'Unknown';
      const brand = brands.find((b) => b._id.equals(product.brand))?.name || 'Unknown';

      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    });

    console.log('✅ Diverse products seeded successfully!');
    console.log(`📊 Total products seeded: ${result.length}`);
    console.log(`📂 Categories: ${Object.keys(categoryCounts).length}`);
    console.log(`🏷️ Brands: ${Object.keys(brandCounts).length}`);
    console.log('\n📈 Category Distribution:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });
    console.log('\n🏷️ Brand Distribution:');
    Object.entries(brandCounts).forEach(([brand, count]) => {
      console.log(`   ${brand}: ${count} products`);
    });
  } catch (error) {
    console.error('❌ Error seeding diverse products:', error);
  }
};

// Export for use in other files
module.exports = { seedDiverseProducts };

// Run if called directly
if (require.main === module) {
  seedDiverseProducts()
    .then(() => {
      console.log('🎉 Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}
