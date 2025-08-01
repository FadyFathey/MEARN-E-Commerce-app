const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

exports.summary = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const sales = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const salesRevenue = sales[0]?.total || 0;

    // Product attribute statistics
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    const topSellers = await Product.countDocuments({ isTopSeller: true });
    const newArrivals = await Product.countDocuments({ isNewArrival: true });
    const bestDeals = await Product.countDocuments({ isBestDeal: true });
    const flashDeals = await Product.countDocuments({ isFlashDeal: true });
    const trendingProducts = await Product.countDocuments({ isTrending: true });
    const limitedStockProducts = await Product.countDocuments({ isLimitedStock: true });

    // Monthly order chart
    const monthlyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
          sales: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      message: 'Admin summary',
      data: {
        totalProducts,
        totalUsers,
        totalOrders,
        salesRevenue,
        productAttributes: {
          featuredProducts,
          topSellers,
          newArrivals,
          bestDeals,
          flashDeals,
          trendingProducts,
          limitedStockProducts,
        },
        monthlyOrders,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching admin summary' });
  }
};

// Product attribute management methods
exports.getProductAttributesSummary = async (req, res) => {
  try {
    const [
      featuredProducts,
      topSellers,
      newArrivals,
      bestDeals,
      flashDeals,
      trendingProducts,
      limitedStockProducts,
      allTags,
    ] = await Promise.all([
      Product.find({ isFeatured: true })
        .select('title _id priorityScore')
        .sort({ priorityScore: -1 })
        .limit(5),
      Product.find({ isTopSeller: true })
        .select('title _id priorityScore')
        .sort({ priorityScore: -1 })
        .limit(5),
      Product.find({ isNewArrival: true })
        .select('title _id createdAt')
        .sort({ createdAt: -1 })
        .limit(5),
      Product.find({ isBestDeal: true })
        .select('title _id discountPercentage')
        .sort({ discountPercentage: -1 })
        .limit(5),
      Product.find({ isFlashDeal: true })
        .select('title _id priorityScore')
        .sort({ priorityScore: -1 })
        .limit(5),
      Product.find({ isTrending: true })
        .select('title _id priorityScore')
        .sort({ priorityScore: -1 })
        .limit(5),
      Product.find({ isLimitedStock: true })
        .select('title _id stockQuantity')
        .sort({ stockQuantity: 1 })
        .limit(5),
      Product.distinct('tags'),
    ]);

    res.json({
      success: true,
      message: 'Product attributes summary',
      data: {
        featuredProducts,
        topSellers,
        newArrivals,
        bestDeals,
        flashDeals,
        trendingProducts,
        limitedStockProducts,
        allTags,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching product attributes summary' });
  }
};

exports.bulkUpdateProductAttributes = async (req, res) => {
  try {
    const { productIds, attributes } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Product IDs array is required' });
    }

    const updateData = {};
    const allowedAttributes = [
      'isFeatured',
      'isTopSeller',
      'isNewArrival',
      'isBestDeal',
      'isLimitedStock',
      'isFlashDeal',
      'isTrending',
      'tags',
      'badges',
      'priorityScore',
    ];

    // Validate and build update data
    for (const [key, value] of Object.entries(attributes)) {
      if (allowedAttributes.includes(key)) {
        updateData[key] = value;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid attributes provided' });
    }

    const result = await Product.updateMany({ _id: { $in: productIds } }, { $set: updateData });

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} products`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating product attributes' });
  }
};

exports.getProductsByAttribute = async (req, res) => {
  try {
    const { attribute, value } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const allowedAttributes = [
      'isFeatured',
      'isTopSeller',
      'isNewArrival',
      'isBestDeal',
      'isLimitedStock',
      'isFlashDeal',
      'isTrending',
    ];

    if (!allowedAttributes.includes(attribute)) {
      return res.status(400).json({ success: false, message: 'Invalid attribute' });
    }

    const filter = { [attribute]: value === 'true' };
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('brand')
        .populate('category')
        .sort({ priorityScore: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      message: `Products with ${attribute}=${value} fetched`,
      data: {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching products by attribute' });
  }
};
