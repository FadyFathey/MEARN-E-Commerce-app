const Coupon = require('../models/Coupon');
const Order = require('../models/Order');

exports.create = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ success: true, message: 'Coupon created', data: coupon });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating coupon' });
  }
};

exports.updateById = async (req, res) => {
  try {
    const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Coupon not found' });
    res.json({ success: true, message: 'Coupon updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating coupon' });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Coupon not found' });
    res.json({ success: true, message: 'Coupon deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting coupon' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json({ success: true, message: 'Coupons fetched', data: coupons });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching coupons' });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon)
      return res.status(404).json({ success: false, message: 'Coupon not found or inactive' });
    if (coupon.expiryDate && new Date() > coupon.expiryDate) {
      return res.status(400).json({ success: false, message: 'Coupon expired' });
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: 'Coupon usage limit reached' });
    }
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderTotal * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }
    const newTotal = Math.max(0, orderTotal - discount);
    res.json({
      success: true,
      message: 'Coupon applied',
      data: { discount, newTotal, couponId: coupon._id },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error applying coupon' });
  }
};
