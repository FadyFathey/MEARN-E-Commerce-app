const Stripe = require('stripe');
const Order = require('../models/Order');
const Product = require('../models/Product');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount is required' });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Stripe webhook handler
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object;
      // Optionally update order status in DB
      if (paymentIntent.metadata && paymentIntent.metadata.orderId) {
        const order = await Order.findByIdAndUpdate(
          paymentIntent.metadata.orderId,
          {
            paymentStatus: 'paid',
            paymentIntentId: paymentIntent.id,
          },
          { new: true }
        );
        // Deduct inventory
        if (order && Array.isArray(order.item)) {
          for (const item of order.item) {
            const product = await Product.findById(item.productId);
            if (product) {
              if (item.variant && product.variants && product.variants.length > 0) {
                // Deduct from correct variant
                const variant = product.variants.find(
                  (v) => v.color === item.variant.color && v.size === item.variant.size
                );
                if (variant && variant.quantity >= item.quantity) {
                  variant.quantity -= item.quantity;
                }
              } else if (product.stock >= item.quantity) {
                // Deduct from main stock if no variants
                product.stock -= item.quantity;
              }
              await product.save();
            }
          }
        }
      }
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object;
      if (paymentIntent.metadata && paymentIntent.metadata.orderId) {
        await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
          paymentStatus: 'failed',
          paymentIntentId: paymentIntent.id,
        });
      }
      break;
    }
    // ... handle other event types as needed
    default:
      break;
  }
  res.json({ received: true });
};
