const Product = require('../models/Product');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (data.variants && Array.isArray(data.variants)) {
      data.variants = data.variants.map((v) => ({
        color: v.color,
        size: v.size,
        quantity: v.quantity,
        sku: v.sku,
      }));
    }
    const created = new Product(data);
    await created.save();
    res.status(201).json({ success: true, message: 'Product created', data: created });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error adding product, please try again later' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    // Full-text search
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ];
    }
    if (req.query.category) {
      filter.category = { $in: req.query.category.split(',') };
    }
    if (req.query.brand) {
      filter.brand = { $in: req.query.brand.split(',') };
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.sort) {
      sort[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
    }
    if (req.query.page && req.query.limit) {
      const pageSize = Number(req.query.limit);
      const page = Number(req.query.page);
      skip = pageSize * (page - 1);
      limit = pageSize;
    }
    const totalDocs = await Product.find(filter).countDocuments().exec();
    const results = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('brand')
      .populate('category')
      .exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json({ success: true, message: 'Products fetched', data: results });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error fetching products, please try again later' });
  }
};

exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate('brand').populate('category');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product fetched', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product by slug' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id).populate('brand').populate('category');
    if (!result) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product fetched', data: result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error getting product details, please try again later' });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.variants && Array.isArray(data.variants)) {
      data.variants = data.variants.map((v) => ({
        color: v.color,
        size: v.size,
        quantity: v.quantity,
        sku: v.sku,
      }));
    }
    const updated = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product updated', data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error updating product, please try again later' });
  }
};

exports.undeleteById = async (req, res) => {
  // Implement as needed
  res.status(501).json({ success: false, message: 'Not implemented' });
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product deleted', data: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error deleting product, please try again later' });
  }
};
