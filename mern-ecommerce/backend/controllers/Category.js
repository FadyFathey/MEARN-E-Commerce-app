const Category = require('../models/Category');

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, message: 'Categories fetched', data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching categories' });
  }
};

exports.create = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating category' });
  }
};

exports.updateById = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating category' });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Category not found' });
    res.json({ success: true, message: 'Category deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting category' });
  }
};
