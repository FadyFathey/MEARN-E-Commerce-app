import React from 'react';

// Product data type definition
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

// Mock product data that the component will use internally
const mockProducts: Product[] = [
  {
    _id: '1',
    title: 'Premium Wireless Gaming Headset with RGB Lighting',
    slug: 'premium-wireless-gaming-headset',
    description: 'High-quality wireless gaming headset with noise cancellation and RGB lighting',
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop'],
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
    createdAt: '2024-07-15T10:30:00Z',
  },
  {
    _id: '2',
    title: 'Ultra-Wide 4K Monitor',
    slug: 'ultra-wide-4k-monitor',
    description: 'Professional 34-inch ultra-wide monitor with 4K resolution',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop'],
    price: 899.99,
    discountPrice: 749.99,
    badges: ['17% OFF'],
    tags: ['Monitor', '4K', 'Professional'],
    isFeatured: false,
    isTopSeller: true,
    isNewArrival: true,
    isBestDeal: false,
    isLimitedStock: false,
    isFlashDeal: true,
    isTrending: false,
    stock: 8,
    variants: [{ color: 'Black', stock: 8 }],
    averageRating: 4.8,
    numReviews: 95,
    category: {
      name: 'Monitors',
      slug: 'monitors',
    },
    brand: {
      name: 'ViewMaster',
      slug: 'viewmaster',
    },
    createdAt: '2025-07-20T14:15:00Z',
  },
  // ... other products can be added here
];

// This single component now renders the entire demo page
const ProductCard: React.FC = () => {
  // Helper function to render the stars for a given rating
  const renderStars = (rating: number, productId: string) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`halfStar-${productId}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#halfStar-${productId})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-3 h-3 xs:w-4 xs:h-4 text-gray-300 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 xs:p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {mockProducts.map((product) => {
            // Logic for each card, moved inside the map
            const isNew =
              new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const hasDiscount = product.discountPrice && product.discountPrice < product.price;
            const discountPercentage = hasDiscount
              ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
              : 0;
            const isOutOfStock = product.stock === 0;

            return (
              // The JSX for a single card
              <div
                key={product._id}
                className="group relative bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl shadow-md xs:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                {/* Product Image Container */}
                <div className="relative aspect-square overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.images[0]}
                    alt={product.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
                    }}
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-sm xs:text-base lg:text-lg font-semibold bg-red-600 px-3 py-2 xs:px-4 xs:py-2 rounded-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {/* ... other badges and overlays */}
                </div>

                {/* Product Info */}
                <div className="p-2.5 xs:p-3 sm:p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-1.5 xs:mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate max-w-[45%]">
                      {product.category.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate max-w-[45%] text-right">
                      {product.brand.name}
                    </span>
                  </div>

                  <h3 className="text-sm xs:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1.5 xs:mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1 leading-tight">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.averageRating, product._id)}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      ({product.numReviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2 xs:mb-3">
                    {hasDiscount ? (
                      <>
                        <span className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                          ${product.discountPrice}
                        </span>
                        <span className="text-sm xs:text-base lg:text-lg text-gray-500 line-through">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <button
                    disabled={isOutOfStock}
                    className={`mt-auto w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 rounded-lg font-semibold transition-all duration-200 text-xs xs:text-sm sm:text-base ${
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
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
