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
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } },
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

    // Admin-controlled attribute filters
    if (req.query.isFeatured) filter.isFeatured = req.query.isFeatured === 'true';
    if (req.query.isTopSeller) filter.isTopSeller = req.query.isTopSeller === 'true';
    if (req.query.isNewArrival) filter.isNewArrival = req.query.isNewArrival === 'true';
    if (req.query.isBestDeal) filter.isBestDeal = req.query.isBestDeal === 'true';
    if (req.query.isLimitedStock) filter.isLimitedStock = req.query.isLimitedStock === 'true';
    if (req.query.isFlashDeal) filter.isFlashDeal = req.query.isFlashDeal === 'true';
    if (req.query.isTrending) filter.isTrending = req.query.isTrending === 'true';
    if (req.query.tags) filter.tags = { $in: req.query.tags.split(',') };

    // Sorting
    if (req.query.sort) {
      sort[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
    } else {
      // Default sorting by priority score and creation date
      sort.priorityScore = -1;
      sort.createdAt = -1;
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

// Admin-specific methods for managing product attributes
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isDeleted: false })
      .sort({ priorityScore: -1, createdAt: -1 })
      .populate('brand')
      .populate('category')
      .limit(10);
    res.status(200).json({ success: true, message: 'Featured products fetched', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching featured products' });
  }
};

exports.getTopSellers = async (req, res) => {
  try {
    const products = await Product.find({ isTopSeller: true, isDeleted: false })
      .sort({ priorityScore: -1, createdAt: -1 })
      .populate('brand')
      .populate('category')
      .limit(10);
    res.status(200).json({ success: true, message: 'Top sellers fetched', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching top sellers' });
  }
};

exports.getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true, isDeleted: false })
      .sort({ createdAt: -1, priorityScore: -1 })
      .populate('brand')
      .populate('category')
      .limit(10);
    res.status(200).json({ success: true, message: 'New arrivals fetched', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching new arrivals' });
  }
};

exports.getBestDeals = async (req, res) => {
  try {
    const products = await Product.find({ isBestDeal: true, isDeleted: false })
      .sort({ discountPercentage: -1, priorityScore: -1 })
      .populate('brand')
      .populate('category')
      .limit(10);
    res.status(200).json({ success: true, message: 'Best deals fetched', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching best deals' });
  }
};

exports.getFlashDeals = async (req, res) => {
  try {
    const products = await Product.find({ isFlashDeal: true, isDeleted: false })
      .sort({ priorityScore: -1, createdAt: -1 })
      .populate('brand')
      .populate('category')
      .limit(10);
    res.status(200).json({ success: true, message: 'Flash deals fetched', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching flash deals' });
  }
};

exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isTrending: true, isDeleted: false })
      .sort({ priorityScore: -1, createdAt: -1 })
      .populate('brand')
      .populate('category')
      .limit(10);
    res.status(200).json({ success: true, message: 'Trending products fetched', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching trending products' });
  }
};

exports.updateProductAttributes = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      isFeatured,
      isTopSeller,
      isNewArrival,
      isBestDeal,
      isLimitedStock,
      isFlashDeal,
      isTrending,
      tags,
      badges,
      priorityScore,
    } = req.body;

    const updateData = {};
    if (typeof isFeatured === 'boolean') updateData.isFeatured = isFeatured;
    if (typeof isTopSeller === 'boolean') updateData.isTopSeller = isTopSeller;
    if (typeof isNewArrival === 'boolean') updateData.isNewArrival = isNewArrival;
    if (typeof isBestDeal === 'boolean') updateData.isBestDeal = isBestDeal;
    if (typeof isLimitedStock === 'boolean') updateData.isLimitedStock = isLimitedStock;
    if (typeof isFlashDeal === 'boolean') updateData.isFlashDeal = isFlashDeal;
    if (typeof isTrending === 'boolean') updateData.isTrending = isTrending;
    if (Array.isArray(tags)) updateData.tags = tags;
    if (Array.isArray(badges)) updateData.badges = badges;
    if (typeof priorityScore === 'number' && priorityScore >= 0 && priorityScore <= 100) {
      updateData.priorityScore = priorityScore;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true })
      .populate('brand')
      .populate('category');

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product attributes updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product attributes' });
  }
};

exports.getProductsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const products = await Product.find({
      tags: { $in: [tag] },
      isDeleted: false,
    })
      .sort({ priorityScore: -1, createdAt: -1 })
      .populate('brand')
      .populate('category');
    res
      .status(200)
      .json({ success: true, message: `Products with tag '${tag}' fetched`, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products by tag' });
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Product.distinct('tags', { isDeleted: false });
    res.status(200).json({ success: true, message: 'All tags fetched', data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching tags' });
  }
};
