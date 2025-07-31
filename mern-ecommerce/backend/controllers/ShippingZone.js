const ShippingZone = require('../models/ShippingZone');

exports.getAll = async (req, res) => {
  try {
    const zones = await ShippingZone.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'Shipping zones fetched', data: zones });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching shipping zones' });
  }
};

exports.getActive = async (req, res) => {
  try {
    const zones = await ShippingZone.find({ isActive: true }).select('-__v');
    res.json({ success: true, message: 'Active shipping zones fetched', data: zones });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching active shipping zones' });
  }
};

exports.getById = async (req, res) => {
  try {
    const zone = await ShippingZone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json({ success: false, message: 'Shipping zone not found' });
    }
    res.json({ success: true, message: 'Shipping zone fetched', data: zone });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching shipping zone' });
  }
};

exports.create = async (req, res) => {
  try {
    const zone = new ShippingZone(req.body);
    await zone.save();
    res.status(201).json({ success: true, message: 'Shipping zone created', data: zone });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Shipping zone name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating shipping zone' });
  }
};

exports.updateById = async (req, res) => {
  try {
    const updated = await ShippingZone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Shipping zone not found' });
    }
    res.json({ success: true, message: 'Shipping zone updated', data: updated });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Shipping zone name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error updating shipping zone' });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deleted = await ShippingZone.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Shipping zone not found' });
    }
    res.json({ success: true, message: 'Shipping zone deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting shipping zone' });
  }
};
