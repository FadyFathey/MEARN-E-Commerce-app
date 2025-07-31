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
        monthlyOrders,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching admin summary' });
  }
};
