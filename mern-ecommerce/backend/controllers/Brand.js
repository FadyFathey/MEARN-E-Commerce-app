const Brand = require('../models/Brand');

exports.getAll = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({ success: true, message: 'Brands fetched', data: brands });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching brands' });
  }
};

exports.create = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json({ success: true, message: 'Brand created', data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating brand' });
  }
};

exports.updateById = async (req, res) => {
  try {
    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, message: 'Brand updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating brand' });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deleted = await Brand.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, message: 'Brand deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting brand' });
  }
};
