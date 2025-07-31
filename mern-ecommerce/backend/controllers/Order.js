const Order = require('../models/Order');
const Coupon = require('../models/Coupon');
const { calculateShippingCost } = require('../utils/shippingCalculator');

exports.create = async (req, res) => {
  try {
    let { couponCode, shippingType = 'standard', shippingZoneId, ...orderData } = req.body;
    let discount = 0;
    let shippingPrice = 0;
    let shippingZone = null;

    // Calculate shipping cost
    if (orderData.address && orderData.address.length > 0) {
      const shippingResult = await calculateShippingCost(
        orderData.address[0],
        shippingType,
        shippingZoneId
      );

      if (!shippingResult.success) {
        return res.status(400).json({
          success: false,
          message: shippingResult.message,
        });
      }

      shippingPrice = shippingResult.data.shippingPrice;
      shippingZone = shippingResult.data.shippingZone;
    }

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
      if (!coupon) {
        return res.status(400).json({ success: false, message: 'Invalid or inactive coupon' });
      }
      if (coupon.expiryDate && new Date() > coupon.expiryDate) {
        return res.status(400).json({ success: false, message: 'Coupon expired' });
      }
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
      }

      if (coupon.discountType === 'percentage') {
        discount = (orderData.total * coupon.discountValue) / 100;
      } else {
        discount = coupon.discountValue;
      }

      orderData.coupon = coupon.code;
      orderData.discount = discount;
      coupon.usedCount += 1;
      await coupon.save();
    }

    // Calculate final total including shipping
    const finalTotal = Math.max(0, orderData.total - discount + shippingPrice);

    // Create order with shipping details
    const orderWithShipping = {
      ...orderData,
      total: finalTotal,
      shippingPrice,
      shippingZone,
      shippingType,
    };

    const created = new Order(orderWithShipping);
    await created.save();

    res.status(201).json({
      success: true,
      message: 'Order created',
      data: created,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating an order, please try again later',
    });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Order.find({ user: id });
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching orders, please trying again later' });
  }
};

exports.getAll = async (req, res) => {
  try {
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Order.find({}).countDocuments().exec();
    const results = await Order.find({}).skip(skip).limit(limit).exec();

    res.header('X-Total-Count', totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching orders, please try again later' });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating order, please try again later' });
  }
};
