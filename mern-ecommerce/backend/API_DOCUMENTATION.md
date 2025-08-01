# Product Attributes API Documentation

## Overview

This document describes the new admin-controlled product attributes that allow admins to customize how products appear on the homepage and frontend filters.

## New Product Attributes

### Boolean Attributes

- `isFeatured`: Show in homepage "Featured" section
- `isTopSeller`: Mark as best-selling product
- `isNewArrival`: Mark as newly added product
- `isBestDeal`: Highlight for major discounts
- `isLimitedStock`: Shows visual warning if true
- `isFlashDeal`: Limited-time offer
- `isTrending`: Admin controlled or computed later

### Array Attributes

- `tags`: Array of strings for frontend filters (e.g., "Gaming", "Wireless")
- `badges`: Array of strings shown as badges on product cards (e.g., "Hot", "20% OFF")

### Numeric Attributes

- `priorityScore`: Number (0-100) for frontend sorting and display ranking

## API Endpoints

### 1. Get Featured Products

```
GET /api/products/featured
```

**Response:**

```json
{
  "success": true,
  "message": "Featured products fetched",
  "data": [
    {
      "_id": "...",
      "title": "iPhone 9",
      "isFeatured": true,
      "priorityScore": 95,
      "tags": ["Smartphone", "Apple", "iOS"],
      "badges": ["Hot", "Limited Stock"]
      // ... other product fields
    }
  ]
}
```

### 2. Get Top Sellers

```
GET /api/products/top-sellers
```

### 3. Get New Arrivals

```
GET /api/products/new-arrivals
```

### 4. Get Best Deals

```
GET /api/products/best-deals
```

### 5. Get Flash Deals

```
GET /api/products/flash-deals
```

### 6. Get Trending Products

```
GET /api/products/trending
```

### 7. Get All Tags

```
GET /api/products/tags
```

**Response:**

```json
{
  "success": true,
  "message": "All tags fetched",
  "data": ["Smartphone", "Apple", "iOS", "Premium", "Gaming", "Wireless"]
}
```

### 8. Get Products by Tag

```
GET /api/products/tag/:tag
```

### 9. Update Product Attributes (Admin Only)

```
PATCH /api/products/:id/attributes
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "isFeatured": true,
  "isTopSeller": false,
  "isNewArrival": true,
  "isBestDeal": false,
  "isLimitedStock": true,
  "isFlashDeal": false,
  "isTrending": true,
  "tags": ["Smartphone", "Apple", "iOS", "Premium"],
  "badges": ["Hot", "Limited Stock"],
  "priorityScore": 95
}
```

## Enhanced Product Endpoints

### Get All Products (Enhanced)

```
GET /api/products?isFeatured=true&isTopSeller=false&tags=Smartphone,Apple&sort=priorityScore&order=desc
```

**Query Parameters:**

- `isFeatured`: Filter by featured status
- `isTopSeller`: Filter by top seller status
- `isNewArrival`: Filter by new arrival status
- `isBestDeal`: Filter by best deal status
- `isLimitedStock`: Filter by limited stock status
- `isFlashDeal`: Filter by flash deal status
- `isTrending`: Filter by trending status
- `tags`: Comma-separated tags to filter by
- `sort`: Sort field (default: priorityScore)
- `order`: Sort order (asc/desc, default: desc)

## Admin Dashboard Endpoints

### 1. Get Product Attributes Summary

```
GET /api/admin/product-attributes
Authorization: Bearer <admin_token>
```

**Response:**

```json
{
  "success": true,
  "message": "Product attributes summary",
  "data": {
    "featuredProducts": [...],
    "topSellers": [...],
    "newArrivals": [...],
    "bestDeals": [...],
    "flashDeals": [...],
    "trendingProducts": [...],
    "limitedStockProducts": [...],
    "allTags": ["Smartphone", "Apple", "iOS", ...]
  }
}
```

### 2. Bulk Update Product Attributes

```
POST /api/admin/bulk-update-attributes
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "productIds": ["65a7e45902e12c44f599444e", "65a7e45902e12c44f599444f"],
  "attributes": {
    "isFeatured": true,
    "tags": ["Smartphone", "Premium"],
    "priorityScore": 90
  }
}
```

### 3. Get Products by Attribute

```
GET /api/admin/products/:attribute/:value?page=1&limit=10
Authorization: Bearer <admin_token>
```

**Example:**

```
GET /api/admin/products/isFeatured/true?page=1&limit=10
```

## Validation Rules

### Product Attributes Schema

- `isFeatured`: Boolean
- `isTopSeller`: Boolean
- `isNewArrival`: Boolean
- `isBestDeal`: Boolean
- `isLimitedStock`: Boolean
- `isFlashDeal`: Boolean
- `isTrending`: Boolean
- `tags`: Array of strings
- `badges`: Array of strings
- `priorityScore`: Number (0-100)

### Bulk Update Schema

- `productIds`: Array of strings (required, min 1)
- `attributes`: Object with at least one valid attribute

## Error Responses

### Validation Error

```json
{
  "success": false,
  "message": "Validation error message"
}
```

### Unauthorized

```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

### Not Found

```json
{
  "success": false,
  "message": "Product not found"
}
```

## Testing Examples

### 1. Create a Product with Attributes

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "description": "Test description",
    "price": 100,
    "category": "category_id",
    "brand": "brand_id",
    "stockQuantity": 10,
    "thumbnail": "image_url",
    "images": ["image_url"],
    "isFeatured": true,
    "tags": ["Test", "New"],
    "badges": ["Hot"],
    "priorityScore": 85
  }'
```

### 2. Update Product Attributes

```bash
curl -X PATCH http://localhost:5000/api/products/product_id/attributes \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "isFeatured": true,
    "isTopSeller": true,
    "tags": ["Smartphone", "Premium"],
    "badges": ["Hot", "Featured"],
    "priorityScore": 95
  }'
```

### 3. Get Featured Products

```bash
curl -X GET http://localhost:5000/api/products/featured
```

### 4. Filter Products by Tags

```bash
curl -X GET "http://localhost:5000/api/products?tags=Smartphone,Apple&isFeatured=true"
```

## Frontend Integration Tips

1. **Homepage Sections**: Use the specific endpoints (`/featured`, `/top-sellers`, etc.) for different homepage sections
2. **Filtering**: Use query parameters to filter products by attributes
3. **Sorting**: Default sorting is by `priorityScore` (descending) and `createdAt` (descending)
4. **Tags**: Use `/tags` endpoint to get all available tags for filter dropdowns
5. **Badges**: Display badges on product cards based on the `badges` array
6. **Limited Stock Warning**: Show visual indicators when `isLimitedStock` is true

## Database Migration

To update existing products with the new attributes, run:

```bash
node backend/seed/updateProductAttributes.js
```

This will add sample attributes to existing products for testing purposes.
