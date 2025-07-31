# Role-Based Access Control (RBAC) Implementation

## Overview

This document describes the Role-Based Access Control (RBAC) system implemented in the MERN e-commerce backend.

## User Roles

### 1. User (`user`)

- Default role for all new users
- Can perform basic operations like:
  - View products
  - Create orders
  - Manage their own profile
  - Add items to cart
  - Write reviews

### 2. Admin (`admin`)

- Elevated privileges for administrative tasks
- Can perform all user operations plus:
  - Create, update, delete products
  - View all orders
  - Delete users
  - Manage inventory

## Implementation Details

### Database Schema Changes

- **User Model**: Replaced `isAdmin` boolean field with `role` enum field
  - Values: `['user', 'admin']`
  - Default: `'user'`

### Middleware

1. **verifyToken** (`middleware/VerifyToken.js`)

   - Authenticates users via JWT token
   - Sets `req.user` with user information including role

2. **verifyAdmin** (`middleware/VerifyAdmin.js`)
   - Checks if authenticated user has admin role
   - Returns 403 Forbidden if user is not admin

### Protected Routes

#### Product Management (Admin Only)

- `POST /products` - Create new product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `PATCH /products/undelete/:id` - Restore deleted product

#### Order Management

- `GET /orders` - View all orders (Admin Only)
- `GET /orders/user/:id` - View user's orders (Authenticated)
- `POST /orders` - Create order (Authenticated)
- `PATCH /orders/:id` - Update order (Authenticated)

#### User Management (Admin Only)

- `DELETE /users/:id` - Delete user account

## Migration

- Automatic migration script runs on server startup
- Converts existing `isAdmin` boolean to `role` string
- Preserves existing admin privileges

## Testing Admin Access

### Test Admin User

- Email: `admin@gmail.com`
- Password: (same as demo users)
- Role: `admin`

### Test Regular User

- Email: `demo@gmail.com`
- Password: (hashed password in seed)
- Role: `user`

## Security Features

1. **Self-Protection**: Admins cannot delete their own accounts
2. **Role Validation**: All admin operations verify role before execution
3. **Token-Based**: Uses JWT tokens with role information
4. **Middleware Chain**: Authentication → Authorization → Controller

## Error Responses

- **401 Unauthorized**: Missing or invalid token
- **403 Forbidden**: Insufficient privileges (not admin)
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

## Usage Examples

### Protecting a Route

```javascript
const { verifyToken } = require('../middleware/VerifyToken');
const { verifyAdmin } = require('../middleware/VerifyAdmin');

router.post('/admin-only', verifyToken, verifyAdmin, controllerFunction);
```

### Checking Role in Controller

```javascript
const { isAdmin } = require('../utils/checkAdmin');

exports.someFunction = async (req, res) => {
  if (isAdmin(req.user)) {
    // Admin-only logic
  } else {
    // User logic
  }
};
```
