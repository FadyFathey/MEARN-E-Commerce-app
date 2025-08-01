# Review & Rating API Documentation

## Overview

This document describes the complete review and rating system for products. The system allows users to create, read, update, and delete reviews with star ratings (1-5) and comments.

## Features

- ✅ Star ratings (1-5 stars)
- ✅ Optional comments (max 1000 characters)
- ✅ Duplicate review prevention
- ✅ Automatic average rating calculation
- ✅ Review count tracking
- ✅ User ownership validation
- ✅ Admin review management
- ✅ Pagination support
- ✅ Authentication required for write operations

## Data Models

### Review Model

```javascript
{
  user: ObjectId (ref: 'User'),
  product: ObjectId (ref: 'Product'),
  rating: Number (1-5),
  comment: String (1-1000 chars),
  createdAt: Date
}
```

### Product Model (Updated)

```javascript
{
  // ... existing fields
  averageRating: Number (0-5, default: 0),
  numReviews: Number (default: 0)
}
```

## API Endpoints

### 1. Create Review

**POST** `/reviews`

**Authentication:** Required (Bearer Token)

**Request Body:**

```json
{
  "product": "product_id_here",
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "_id": "review_id",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "product": "product_id",
    "rating": 5,
    "comment": "Excellent product! Highly recommended.",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `400` - User has already reviewed this product
- `400` - Validation error (invalid rating, missing fields)
- `401` - Unauthorized (no token)
- `500` - Server error

### 2. Get Reviews by Product

**GET** `/reviews/product/:productId`

**Authentication:** Not required

**Query Parameters:**

- `page` (optional) - Page number for pagination
- `limit` (optional) - Number of reviews per page

**Example:** `GET /reviews/product/64a1b2c3d4e5f6789012345?page=1&limit=10`

**Response:**

```json
{
  "success": true,
  "message": "Reviews fetched successfully",
  "data": [
    {
      "_id": "review_id",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "product": "product_id",
      "rating": 5,
      "comment": "Excellent product!",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Headers:**

- `X-Total-Count` - Total number of reviews for the product

### 3. Get User's Review for Product

**GET** `/reviews/user/:productId`

**Authentication:** Required (Bearer Token)

**Response:**

```json
{
  "success": true,
  "message": "User review found",
  "data": {
    "_id": "review_id",
    "user": "user_id",
    "product": "product_id",
    "rating": 4,
    "comment": "Good product",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (No Review):**

```json
{
  "success": true,
  "message": "No review found for this product",
  "data": null
}
```

### 4. Update Review

**PATCH** `/reviews/:reviewId`

**Authentication:** Required (Bearer Token)

**Request Body:**

```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {
    "_id": "review_id",
    "user": {
      "_id": "user_id",
      "name": "John Doe"
    },
    "product": "product_id",
    "rating": 4,
    "comment": "Updated comment",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `403` - User doesn't own this review
- `404` - Review not found
- `400` - Validation error

### 5. Delete Review

**DELETE** `/reviews/:reviewId`

**Authentication:** Required (Bearer Token)

**Response:**

```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": {
    "_id": "review_id",
    "user": "user_id",
    "product": "product_id",
    "rating": 4,
    "comment": "Good product",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `403` - User doesn't own this review
- `404` - Review not found

### 6. Admin Delete Review

**DELETE** `/reviews/admin/:reviewId`

**Authentication:** Required (Bearer Token + Admin Role)

**Response:**

```json
{
  "success": true,
  "message": "Review deleted successfully by admin",
  "data": {
    "_id": "review_id",
    "user": "user_id",
    "product": "product_id",
    "rating": 4,
    "comment": "Good product",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Product API Integration

### Updated Product Response

All product endpoints now include rating data:

```json
{
  "success": true,
  "message": "Product fetched",
  "data": {
    "_id": "product_id",
    "title": "Product Name",
    "price": 99.99,
    "averageRating": 4.5,
    "numReviews": 128
    // ... other product fields
  }
}
```

## Validation Rules

### Review Creation/Update

- `rating`: Required, integer, 1-5
- `comment`: Required, string, 1-1000 characters
- `product`: Required, valid product ID
- `user`: Automatically set from JWT token

### Business Rules

- Users can only review a product once
- Users can only update/delete their own reviews
- Admins can delete any review
- Rating calculations are automatic
- Reviews are sorted by creation date (newest first)

## Error Handling

### Common Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

### Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```

## Frontend Integration

### ProductCard Component

The frontend ProductCard component expects these props:

```typescript
interface Product {
  // ... other fields
  averageRating: number;
  numReviews: number;
}
```

### Star Rating Display

The component includes a `renderStars()` function that displays:

- Full stars for whole numbers
- Half stars for decimal ratings
- Empty stars to complete 5 stars
- Review count in parentheses

## Database Migration

### Running Rating Updates

To update existing products with rating data:

```bash
node utils/updateProductRatings.js
```

This script will:

1. Find all products with reviews
2. Calculate average ratings and review counts
3. Update the Product documents
4. Display statistics

## Security Features

- JWT token authentication required for write operations
- User ownership validation for updates/deletes
- Admin role required for admin operations
- Input validation and sanitization
- Rate limiting (implemented at server level)

## Performance Considerations

- Rating calculations are cached in Product model
- Reviews are paginated for large datasets
- Database indexes on user, product, and rating fields
- Aggregation queries optimized for rating calculations

## Testing

### Test Cases

1. Create review with valid data
2. Attempt duplicate review (should fail)
3. Update own review
4. Update another user's review (should fail)
5. Delete own review
6. Admin delete any review
7. Get reviews with pagination
8. Get user's specific review

### Sample Test Data

```javascript
// Valid review
{
  "product": "64a1b2c3d4e5f6789012345",
  "rating": 5,
  "comment": "Excellent product quality!"
}

// Invalid review (rating out of range)
{
  "product": "64a1b2c3d4e5f6789012345",
  "rating": 6,
  "comment": "Great product!"
}
```
