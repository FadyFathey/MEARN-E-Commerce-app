const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    variants: [
      {
        color: { type: String },
        size: { type: String },
        quantity: { type: Number, default: 0 },
        sku: { type: String },
      },
    ],
    // Rating fields
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Admin-controlled attributes for homepage and frontend display
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTopSeller: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isBestDeal: {
      type: Boolean,
      default: false,
    },
    isLimitedStock: {
      type: Boolean,
      default: false,
    },
    isFlashDeal: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    badges: {
      type: [String],
      default: [],
    },
    priorityScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Product', productSchema);
