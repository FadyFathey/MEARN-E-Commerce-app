const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    item: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    address: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Dispatched', 'Out for delivery', 'Cancelled'],
      default: 'Pending',
    },
    paymentMode: {
      type: String,
      enum: ['COD', 'UPI', 'CARD'],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentIntentId: {
      type: String,
    },
    coupon: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    shippingZone: {
      type: Schema.Types.ObjectId,
      ref: 'ShippingZone',
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    shippingType: {
      type: String,
      enum: ['standard', 'express'],
      default: 'standard',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Order', orderSchema);
