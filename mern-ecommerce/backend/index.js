require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/Auth');
const productRoutes = require('./routes/Product');
const orderRoutes = require('./routes/Order');
const cartRoutes = require('./routes/Cart');
const brandRoutes = require('./routes/Brand');
const categoryRoutes = require('./routes/Category');
const userRoutes = require('./routes/User');
const addressRoutes = require('./routes/Address');
const reviewRoutes = require('./routes/Review');
const wishlistRoutes = require('./routes/Wishlist');
const paymentRoutes = require('./routes/Payment');
const adminRoutes = require('./routes/Admin');
const couponRoutes = require('./routes/Coupon');
const shippingZoneRoutes = require('./routes/ShippingZone');
const shippingRoutes = require('./routes/Shipping');
const { connectToDB } = require('./database/db');
const { migrateUserRoles } = require('./utils/migrateUserRoles');

// server init
const server = express();

// database connection
connectToDB();

// Run user role migration
migrateUserRoles().catch(console.error);

// middlewares
server.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);
server.use(cookieParser());
server.use(morgan('tiny'));

// Stripe webhook needs raw body
server.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
server.use(express.json());

// routeMiddleware
server.use('/auth', authRoutes);
server.use('/users', userRoutes);
server.use('/products', productRoutes);
server.use('/orders', orderRoutes);
server.use('/cart', cartRoutes);
server.use('/brands', brandRoutes);
server.use('/categories', categoryRoutes);
server.use('/address', addressRoutes);
server.use('/reviews', reviewRoutes);
server.use('/wishlist', wishlistRoutes);
server.use('/api/payment', paymentRoutes);
server.use('/api/admin', adminRoutes);
server.use('/api/coupon', couponRoutes);
server.use('/api/shipping-zones', shippingZoneRoutes);
server.use('/api/shipping', shippingRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'running' });
});

server.listen(8000, () => {
  console.log('server [STARTED] ~ http://localhost:8000');
});
