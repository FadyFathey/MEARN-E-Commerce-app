import React from 'react';
import dummtproductimg from '../../assets/dummtproductimg.png';

// Mock product data type definition
interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
  badges: string[];
  tags: string[];
  isFeatured: boolean;
  isTopSeller: boolean;
  isNewArrival: boolean;
  isBestDeal: boolean;
  isLimitedStock: boolean;
  isFlashDeal: boolean;
  isTrending: boolean;
  stock: number;
  variants: Array<{
    size?: string;
    color?: string;
    stock: number;
  }>;
  averageRating: number;
  numReviews: number;
  category: {
    name: string;
    slug: string;
  };
  brand: {
    name: string;
    slug: string;
  };
  createdAt: string;
}

// Mock product data
const mockProduct: Product = {
  _id: '1',
  title: 'Premium Wireless Gaming Headset',
  slug: 'premium-wireless-gaming-headset',
  description: 'High-quality wireless gaming headset with noise cancellation and RGB lighting',
  images: [dummtproductimg],
  price: 299.99,
  discountPrice: 249.99,
  badges: ['20% OFF', 'Hot'],
  tags: ['Gaming', 'Wireless', 'RGB'],
  isFeatured: true,
  isTopSeller: true,
  isNewArrival: false,
  isBestDeal: true,
  isLimitedStock: true,
  isFlashDeal: false,
  isTrending: true,
  stock: 15,
  variants: [
    { size: 'M', color: 'Black', stock: 8 },
    { size: 'L', color: 'White', stock: 7 },
  ],
  averageRating: 4.5,
  numReviews: 128,
  category: {
    name: 'Gaming Accessories',
    slug: 'gaming-accessories',
  },
  brand: {
    name: 'GameTech Pro',
    slug: 'gametech-pro',
  },
  createdAt: '2024-01-15T10:30:00Z',
};

interface ProductCardProps {
  product?: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product = mockProduct, className = '' }) => {
  const isNew = new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;
  const isOutOfStock = product.stock === 0;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {/* Main Product Image */}
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={product.images[0] || dummtproductimg}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src = dummtproductimg;
          }}
        />

        {/* Overlay for out of stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold bg-red-600 px-4 py-2 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              FEATURED
            </span>
          )}
          {product.isTopSeller && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              TOP SELLER
            </span>
          )}
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {product.isFlashDeal && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              FLASH DEAL
            </span>
          )}
          {product.isLimitedStock && product.stock < 10 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.stock} LEFT
            </span>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category and Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {product.category.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {product.brand.name}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">{renderStars(product.averageRating)}</div>
          <span className="text-sm text-gray-600 dark:text-gray-400">({product.numReviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {hasDiscount ? (
            <>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.discountPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 10
                  ? 'bg-green-500'
                  : product.stock > 0
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            ></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.stock > 10
                ? 'In Stock'
                : product.stock > 0
                ? `${product.stock} left`
                : 'Out of Stock'}
            </span>
          </div>

          {/* Trending Badge */}
          {product.isTrending && (
            <span className="text-xs bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-2 py-1 rounded-full">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
