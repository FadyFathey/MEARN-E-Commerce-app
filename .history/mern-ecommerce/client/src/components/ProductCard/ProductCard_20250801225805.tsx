import React from 'react';

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
    createdAt: '2024-01-15T10:30:00Z',
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
    createdAt: '2024-02-20T14:15:00Z',
  },
  {
    _id: '3',
    title: 'Mechanical Gaming Keyboard',
    slug: 'mechanical-gaming-keyboard',
    description: 'RGB mechanical keyboard with cherry MX switches',
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop'],
    price: 159.99,
    badges: [],
    tags: ['Keyboard', 'RGB', 'Mechanical'],
    isFeatured: false,
    isTopSeller: false,
    isNewArrival: false,
    isBestDeal: true,
    isLimitedStock: false,
    isFlashDeal: false,
    isTrending: true,
    stock: 25,
    variants: [
      { color: 'Black', stock: 15 },
      { color: 'White', stock: 10 },
    ],
    averageRating: 4.3,
    numReviews: 67,
    category: {
      name: 'Keyboards',
      slug: 'keyboards',
    },
    brand: {
      name: 'KeyCraft',
      slug: 'keycraft',
    },
    createdAt: '2024-01-10T09:20:00Z',
  },
  {
    _id: '4',
    title: 'Wireless Mouse Pro',
    slug: 'wireless-mouse-pro',
    description: 'High-precision wireless gaming mouse with customizable buttons',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'],
    price: 89.99,
    discountPrice: 69.99,
    badges: ['22% OFF'],
    tags: ['Mouse', 'Wireless', 'Gaming'],
    isFeatured: true,
    isTopSeller: false,
    isNewArrival: true,
    isBestDeal: false,
    isLimitedStock: true,
    isFlashDeal: false,
    isTrending: false,
    stock: 3,
    variants: [
      { color: 'Black', stock: 2 },
      { color: 'White', stock: 1 },
    ],
    averageRating: 4.6,
    numReviews: 89,
    category: {
      name: 'Mice',
      slug: 'mice',
    },
    brand: {
      name: 'ClickMaster',
      slug: 'clickmaster',
    },
    createdAt: '2024-02-28T16:45:00Z',
  },
  {
    _id: '5',
    title: 'Professional Webcam HD',
    slug: 'professional-webcam-hd',
    description: '1080p webcam with auto-focus and noise reduction',
    images: ['https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=400&fit=crop'],
    price: 129.99,
    badges: [],
    tags: ['Webcam', 'HD', 'Streaming'],
    isFeatured: false,
    isTopSeller: true,
    isNewArrival: false,
    isBestDeal: false,
    isLimitedStock: false,
    isFlashDeal: false,
    isTrending: true,
    stock: 0,
    variants: [{ color: 'Black', stock: 0 }],
    averageRating: 4.2,
    numReviews: 156,
    category: {
      name: 'Cameras',
      slug: 'cameras',
    },
    brand: {
      name: 'StreamTech',
      slug: 'streamtech',
    },
    createdAt: '2024-01-05T11:30:00Z',
  },
  {
    _id: '6',
    title: 'Bluetooth Speakers Stereo',
    slug: 'bluetooth-speakers-stereo',
    description: 'Portable stereo speakers with deep bass and long battery life',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'],
    price: 199.99,
    discountPrice: 149.99,
    badges: ['25% OFF'],
    tags: ['Speakers', 'Bluetooth', 'Portable'],
    isFeatured: false,
    isTopSeller: false,
    isNewArrival: true,
    isBestDeal: true,
    isLimitedStock: false,
    isFlashDeal: true,
    isTrending: false,
    stock: 18,
    variants: [
      { color: 'Black', stock: 10 },
      { color: 'Blue', stock: 8 },
    ],
    averageRating: 4.7,
    numReviews: 203,
    category: {
      name: 'Audio',
      slug: 'audio',
    },
    brand: {
      name: 'SoundWave',
      slug: 'soundwave',
    },
    createdAt: '2024-03-01T13:20:00Z',
  },
];

interface ProductCardProps {
  product?: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product = mockProducts[0], className = '' }) => {
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
        <svg
          key={i}
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
            <linearGradient id={`halfStar-${product._id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#halfStar-${product._id})`}
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
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl shadow-md xs:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col ${className}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden flex-shrink-0">
        {/* Main Product Image */}
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={product.images[0]}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
          }}
        />

        {/* Overlay for out of stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-sm xs:text-base lg:text-lg font-semibold bg-red-600 px-3 py-2 xs:px-4 xs:py-2 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Top Left Badges */}
        <div className="absolute top-2 xs:top-3 left-2 xs:left-3 flex flex-col gap-1 xs:gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
              NEW
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-purple-500 text-white text-xs font-bold px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
              FEATURED
            </span>
          )}
          {product.isTopSeller && (
            <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
              TOP SELLER
            </span>
          )}
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-2 xs:top-3 right-2 xs:right-3 flex flex-col gap-1 xs:gap-2">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {product.isFlashDeal && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full animate-pulse">
              FLASH DEAL
            </span>
          )}
          {product.isLimitedStock && product.stock < 10 && product.stock > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full">
              {product.stock} LEFT
            </span>
          )}
        </div>

        {/* Quick Action Buttons - Hidden on mobile, shown on hover for larger screens */}
        <div className="absolute bottom-2 xs:bottom-3 right-2 xs:right-3 hidden sm:flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="bg-white dark:bg-gray-700 p-1.5 xs:p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            title="Add to Wishlist"
            aria-label="Add to Wishlist"
          >
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-300"
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
          <button
            className="bg-white dark:bg-gray-700 p-1.5 xs:p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            title="Quick View"
            aria-label="Quick View"
          >
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2.5 xs:p-3 sm:p-4 flex-1 flex flex-col">
        {/* Category and Brand */}
        <div className="flex items-center justify-between mb-1.5 xs:mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate max-w-[45%]">
            {product.category.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate max-w-[45%] text-right">
            {product.brand.name}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1.5 xs:mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1 leading-tight">
          {product.title}
        </h3>

        {/* Tags - Only show on larger screens to save space */}
        {product.tags.length > 0 && (
          <div className="hidden xs:flex flex-wrap gap-1 mb-2 sm:mb-3">
            {product.tags.slice(0, 2).map((tag, index) => (
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
        <div className="flex items-center gap-1.5 xs:gap-2 mb-2 xs:mb-3">
          <div className="flex items-center gap-0.5">{renderStars(product.averageRating)}</div>
          <span className="text-xs text-gray-600 dark:text-gray-400">({product.numReviews})</span>
        </div>

        {/* Price */}
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

        {/* Stock Status */}
        <div className="flex items-center justify-between mb-2.5 xs:mb-3 sm:mb-4 mt-auto">
          <div className="flex items-center gap-1.5 xs:gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 10
                  ? 'bg-green-500'
                  : product.stock > 0
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            ></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {product.stock > 10
                ? 'In Stock'
                : product.stock > 0
                ? `${product.stock} left`
                : 'Out of Stock'}
            </span>
          </div>

          {/* Trending Badge */}
          {product.isTrending && (
            <span className="text-xs bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-1.5 xs:px-2 py-1 rounded-full">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={isOutOfStock}
          className={`w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 rounded-lg font-semibold transition-all duration-200 text-xs xs:text-sm sm:text-base ${
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

// Demo component showing responsive grid with all product states
const ProductCardDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 xs:p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 xs:mb-8 text-center">
          ProductCard Component Demo
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Showcasing various product states: Normal, Flash Deals, Trending, Limited Stock, Out of
          Stock, Best Deals, New Arrivals, and Featured products across all screen sizes.
        </p>

        {/* Responsive Grid: 1 column on small, 2 on medium, 3 on large, 4 on xl, 5 on 2xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Features showcase */}
        <div className="mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Features Demonstrated:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Product images with fallback</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Price and discount display</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Rating stars with reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Stock status indicators</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Multiple badge types</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Category and brand info</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Product tags</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Hover effects and animations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Dark mode support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Out of stock overlay</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Quick action buttons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Fully responsive design</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Mobile-first approach</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Flexible grid layouts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span>Adaptive typography</span>
            </div>
          </div>
        </div>

        {/* Product States Info */}
        <div className="mt-12 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Product States Showcased:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Normal Product</h3>
              <p>Standard product with regular pricing and stock</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flash Deal</h3>
              <p>Limited time offers with animated badges</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trending</h3>
              <p>Popular products with fire emoji indicator</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Limited Stock</h3>
              <p>Low stock warnings with countdown</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Out of Stock</h3>
              <p>Overlay with disabled add to cart</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">New Arrival</h3>
              <p>Recently added products with green badge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDemo;
