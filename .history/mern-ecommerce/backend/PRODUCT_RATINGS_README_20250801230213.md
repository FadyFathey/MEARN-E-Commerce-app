# Product Ratings & Reviews System

## 🎯 Overview

This document describes the complete implementation of the product ratings and reviews system for the MERN e-commerce backend. The system allows users to create, read, update, and delete reviews with star ratings (1-5) and comments.

## ✅ Features Implemented

### Core Functionality
- ⭐ **Star Ratings**: 1-5 star rating system
- 💬 **Comments**: Optional text comments (max 1000 characters)
- 🔄 **Automatic Calculations**: Real-time average rating and review count updates
- 🚫 **Duplicate Prevention**: Users can only review a product once
- 👤 **User Ownership**: Users can only modify their own reviews
- 🔐 **Authentication**: JWT token required for all write operations
- 👨‍💼 **Admin Management**: Admins can delete any review
- 📄 **Pagination**: Support for large review datasets
- ✅ **Validation**: Input validation and sanitization

### API Endpoints
- `POST /reviews` - Create a new review
- `GET /reviews/product/:id` - Get reviews for a product
- `GET /reviews/user/:productId` - Get user's review for a product
- `PATCH /reviews/:id` - Update a review
- `DELETE /reviews/:id` - Delete a review
- `DELETE /reviews/admin/:id` - Admin delete review

### Product Integration
- All product API responses now include `averageRating` and `numReviews`
- Rating data is automatically updated when reviews change
- Frontend ProductCard component already supports rating display

## 🚀 Quick Start

### 1. Database Setup
The rating system requires the following database changes:

```javascript
// Product Model (already updated)
{
  averageRating: Number (0-5, default: 0),
  numReviews: Number (default: 0)
}

// Review Model (already implemented)
{
  user: ObjectId (ref: 'User'),
  product: ObjectId (ref: 'Product'),
  rating: Number (1-5),
  comment: String (1-1000 chars),
  createdAt: Date
}
```

### 2. Run Setup Script
```bash
cd mern-ecommerce/backend
node scripts/setupProductRatings.js
```

This script will:
- Check for existing reviews
- Update all products with rating data
- Display statistics
- Verify the implementation

### 3. Start the Server
```bash
npm start
```

The server will run on `http://localhost:8000` with all review endpoints available.

## 📚 API Documentation

### Create Review
```http
POST /reviews
Authorization: Bearer <jwt-token>
Content-Type: application/json

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

### Get Reviews by Product
```http
GET /reviews/product/product_id_here?page=1&limit=10
```

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

### Update Review
```http
PATCH /reviews/review_id_here
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated comment"
}
```

### Delete Review
```http
DELETE /reviews/review_id_here
Authorization: Bearer <jwt-token>
```

## 🔧 Configuration

### Environment Variables
Make sure your `.env` file includes:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Validation Rules
- **Rating**: Required, integer, 1-5
- **Comment**: Required, string, 1-1000 characters
- **Product**: Required, valid product ID
- **User**: Automatically set from JWT token

### Business Rules
- Users can only review a product once
- Users can only update/delete their own reviews
- Admins can delete any review
- Rating calculations are automatic
- Reviews are sorted by creation date (newest first)

## 🧪 Testing

### Run Setup and Tests
```bash
# Setup the rating system
node scripts/setupProductRatings.js

# Test API endpoints (requires running server)
node scripts/testReviewAPI.js
```

### Manual Testing
1. **Create Review**: Use Postman or curl to create a review
2. **Check Duplicate Prevention**: Try to create another review for the same product
3. **Update Review**: Modify an existing review
4. **Delete Review**: Remove a review
5. **Check Product Rating**: Verify that product rating is updated

### Example Test with curl
```bash
# Create a review
curl -X POST http://localhost:8000/reviews \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product": "product_id_here",
    "rating": 5,
    "comment": "Great product!"
  }'

# Get reviews for a product
curl http://localhost:8000/reviews/product/product_id_here
```

## 🔒 Security Features

### Authentication
- JWT token required for all write operations
- Token validation middleware applied to all protected routes
- User ID extracted from token for ownership validation

### Authorization
- Users can only modify their own reviews
- Admin role required for admin operations
- Input validation prevents malicious data

### Data Protection
- User passwords excluded from review responses
- Input sanitization prevents XSS attacks
- Rate limiting (implemented at server level)

## 📊 Database Schema

### Product Collection
```javascript
{
  _id: ObjectId,
  title: String,
  price: Number,
  // ... other product fields
  averageRating: Number, // 0-5, calculated from reviews
  numReviews: Number,    // Count of reviews
  // ... rest of product fields
}
```

### Review Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId,        // Reference to User
  product: ObjectId,     // Reference to Product
  rating: Number,        // 1-5
  comment: String,       // 1-1000 characters
  createdAt: Date        // Auto-generated
}
```

## 🔄 Rating Calculation

The system uses MongoDB aggregation to calculate ratings:

```javascript
// Average rating calculation
const ratingStats = await Review.aggregate([
  { $match: { product: productId } },
  {
    $group: {
      _id: null,
      averageRating: { $avg: '$rating' },
      numReviews: { $sum: 1 }
    }
  }
]);
```

## 🎨 Frontend Integration

### ProductCard Component
The frontend ProductCard component already supports rating display:

```typescript
interface Product {
  _id: string;
  title: string;
  price: number;
  averageRating: number;  // ✅ Now included in API
  numReviews: number;     // ✅ Now included in API
  // ... other fields
}
```

### Star Rating Display
The component includes a `renderStars()` function that displays:
- Full stars for whole numbers
- Half stars for decimal ratings
- Empty stars to complete 5 stars
- Review count in parentheses

## 🚨 Error Handling

### Common Error Codes
- `400` - Bad Request (validation errors, duplicate review)
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

## 📈 Performance Considerations

### Optimization Features
- Rating calculations are cached in Product model
- Reviews are paginated for large datasets
- Database indexes on user, product, and rating fields
- Aggregation queries optimized for rating calculations

### Monitoring
- Review creation/update/deletion logs
- Rating calculation performance metrics
- Database query optimization

## 🔧 Maintenance

### Regular Tasks
1. **Monitor Rating Accuracy**: Ensure ratings are calculated correctly
2. **Review Moderation**: Check for inappropriate reviews
3. **Performance Monitoring**: Watch for slow queries
4. **Database Cleanup**: Remove orphaned reviews

### Backup and Recovery
- Regular database backups
- Review data export functionality
- Rating recalculation scripts

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Failed
```
Error: Could not connect to any servers in your MongoDB Atlas cluster
```
**Solution**: Check IP whitelist and connection string

#### Rating Not Updating
```
Product rating not updating after review creation
```
**Solution**: Run `node scripts/setupProductRatings.js`

#### Duplicate Review Error
```
User has already reviewed this product
```
**Solution**: This is expected behavior. Users can only review once.

#### Authentication Error
```
401 Unauthorized
```
**Solution**: Ensure valid JWT token is provided

### Debug Commands
```bash
# Check database connection
node -e "require('./database/db').connectToDB()"

# Verify rating calculations
node utils/updateProductRatings.js

# Test API endpoints
node scripts/testReviewAPI.js
```

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the API documentation in `REVIEW_API_DOCUMENTATION.md`
3. Run the test scripts to verify functionality
4. Check server logs for error details

## 🎉 Success Metrics

The rating system is working correctly when:
- ✅ Users can create reviews with ratings 1-5
- ✅ Duplicate reviews are prevented
- ✅ Product average ratings are calculated correctly
- ✅ Review counts are accurate
- ✅ Users can update/delete their own reviews
- ✅ Admins can manage all reviews
- ✅ Frontend displays ratings correctly

---

**Implementation Status**: ✅ **COMPLETE**
**Last Updated**: January 2024
**Version**: 1.0.0 