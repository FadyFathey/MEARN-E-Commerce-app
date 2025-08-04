const Category = require('../models/Category');

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    const sort = {};

    // Sorting
    if (req.query.sort) {
      sort[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
    } else {
      // Default sorting by name
      sort.name = 1;
    }

    // Pagination parameters with validation
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 20)); // Max 100 items per page
    const skip = (page - 1) * limit;

    // Count total categories matching the filter
    const totalCategories = await Category.countDocuments(filter);

    // Fetch paginated results
    const results = await Category.find(filter).sort(sort).skip(skip).limit(limit).exec();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCategories / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Build response with pagination metadata
    const response = {
      success: true,
      message: 'Categories fetched',
      data: results,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalPages: totalPages,
        totalCategories: totalCategories,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
      },
    };

    res.set('X-Total-Count', totalCategories);
    res.status(200).json(response);
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
