# MERN E-commerce Backend

A full-featured e-commerce backend built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy the `.env.example` file to `.env` and configure your variables:

   ```bash
   cp .env.example .env
   ```

3. **Start the server:**

   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

## 📋 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run seed` - Seed the database with sample data
- `npm run build` - Build the project (no-op for Node.js)
- `npm run lint` - Run linting (placeholder)
- `npm run clean` - Clean and reinstall dependencies

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/mern-ecommerce

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
ORIGIN=http://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (for nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

## 🏗️ Project Structure

```
backend/
├── controllers/     # Route controllers
├── database/        # Database connection
├── middleware/      # Custom middleware
├── models/          # MongoDB models
├── routes/          # API routes
├── seed/           # Database seeding
├── utils/          # Utility functions
├── index.js        # Main server file
└── package.json    # Dependencies and scripts
```

## 🔌 API Endpoints

The server runs on `http://localhost:8000` and includes the following main routes:

- `/auth` - Authentication routes
- `/users` - User management
- `/products` - Product management
- `/orders` - Order management
- `/cart` - Shopping cart
- `/brands` - Brand management
- `/categories` - Category management
- `/reviews` - Product reviews
- `/wishlist` - User wishlists
- `/api/payment` - Payment processing
- `/api/admin` - Admin routes
- `/api/coupon` - Coupon management
- `/api/shipping-zones` - Shipping zones
- `/api/shipping` - Shipping calculations

## 🛠️ Dependencies

### Core Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `morgan` - HTTP request logger
- `cookie-parser` - Cookie parsing
- `nodemailer` - Email sending
- `stripe` - Payment processing
- `google-auth-library` - Google OAuth
- `joi` - Data validation
- `axios` - HTTP client

### Development Dependencies

- `nodemon` - Auto-restart on file changes

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   # Kill process using port 8000
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   ```

2. **MongoDB connection issues:**

   - Ensure MongoDB is running
   - Check your MONGO_URI in .env
   - Verify network connectivity

3. **Missing dependencies:**

   ```bash
   npm install
   ```

4. **Environment variables not loading:**
   - Ensure .env file exists in root directory
   - Check for typos in variable names
   - Restart the server after changes

## 📝 License

This project is licensed under the ISC License.
