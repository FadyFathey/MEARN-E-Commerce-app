const mongoose = require('mongoose');
const { Schema } = mongoose;

const shippingZoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    cities: [
      {
        type: String,
        required: true,
      },
    ],
    states: [
      {
        type: String,
      },
    ],
    countries: [
      {
        type: String,
        default: ['US'], // Default to US
      },
    ],
    standardPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    expressPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    estimatedDays: {
      standard: {
        type: Number,
        default: 5,
      },
      express: {
        type: Number,
        default: 2,
      },
    },
  },
  { timestamps: true }
);

// Index for efficient city/state/country lookups
shippingZoneSchema.index({ cities: 1, states: 1, countries: 1 });

module.exports = mongoose.model('ShippingZone', shippingZoneSchema);
