const Brand = require('../models/Brand');

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

    // Count total brands matching the filter
    const totalBrands = await Brand.countDocuments(filter);

    // Fetch paginated results
    const results = await Brand.find(filter).sort(sort).skip(skip).limit(limit).exec();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalBrands / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Build response with pagination metadata
    const response = {
      success: true,
      message: 'Brands fetched',
      data: results,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalPages: totalPages,
        totalBrands: totalBrands,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
      },
    };

    res.set('X-Total-Count', totalBrands);
    res.status(200).json(response);
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
