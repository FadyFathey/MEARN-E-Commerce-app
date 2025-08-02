import React from 'react';
import type { IProduct } from '../../types/prodcut';
import Rating from 'react-rating';

// Mock product data
const mockProducts: IProduct[] = [
  {
    _id: '1',
    title: 'T-SHIRT WITH TAPE DETAILS',
    slug: 'tshirt-tape-details',
    description: 'Premium cotton t-shirt with modern tape detailing',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
    price: 120,
    discountPrice: 96,
    badges: ['20% OFF'],
    tags: ['Casual', 'Cotton', 'Trending'],
    isFeatured: true,
    isTopSeller: true,
    isNewArrival: false,
    isBestDeal: true,
    isLimitedStock: false,
    isFlashDeal: false,
    isTrending: true,
    stock: 15,
    variants: [
      { size: 'S', color: 'White', stock: 5 },
      { size: 'M', color: 'Black', stock: 8 },
      { size: 'L', color: 'Gray', stock: 2 },
    ],
    averageRating: 4.5,
    numReviews: 123,
    category: {
      name: 'T-Shirts',
      slug: 't-shirts',
    },
    brand: {
      name: 'Shop.Co',
      slug: 'shop-co',
    },
    createdAt: '2024-07-15T10:30:00Z',
  },
  {
    _id: '2',
    title: 'SKINNY FIT JEANS',
    slug: 'skinny-fit-jeans',
    description: 'Modern skinny fit jeans with premium denim fabric',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'],
    price: 240,
    discountPrice: 192,
    badges: ['20% OFF'],
    tags: ['Denim', 'Skinny Fit', 'Popular'],
    isFeatured: false,
    isTopSeller: true,
    isNewArrival: true,
    isBestDeal: false,
    isLimitedStock: false,
    isFlashDeal: false,
    isTrending: true,
    stock: 8,
    variants: [
      { size: '30', color: 'Blue', stock: 4 },
      { size: '32', color: 'Black', stock: 4 },
    ],
    averageRating: 3.5,
    numReviews: 67,
    category: {
      name: 'Jeans',
      slug: 'jeans',
    },
    brand: {
      name: 'Shop.Co',
      slug: 'shop-co',
    },
    createdAt: '2024-07-20T14:15:00Z',
  },
  {
    _id: '3',
    title: 'CHECKERED SHIRT',
    slug: 'checkered-shirt',
    description: 'Classic checkered pattern shirt for casual wear',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop'],
    price: 180,
    badges: [],
    tags: ['Casual', 'Pattern', 'Classic'],
    isFeatured: false,
    isTopSeller: false,
    isNewArrival: true,
    isBestDeal: false,
    isLimitedStock: false,
    isFlashDeal: false,
    isTrending: false,
    stock: 12,
    variants: [
      { size: 'M', color: 'Red', stock: 6 },
      { size: 'L', color: 'Blue', stock: 6 },
    ],
    averageRating: 4.5,
    numReviews: 89,
    category: {
      name: 'Shirts',
      slug: 'shirts',
    },
    brand: {
      name: 'Shop.Co',
      slug: 'shop-co',
    },
    createdAt: '2024-07-25T09:00:00Z',
  },
  {
    _id: '4',
    title: 'SLEEVE STRIPED T-SHIRT',
    slug: 'sleeve-striped-tshirt',
    description: 'Comfortable t-shirt with stylish sleeve stripes',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f37f3820?w=400&h=400&fit=crop'],
    price: 130,
    discountPrice: 104,
    badges: ['20% OFF'],
    tags: ['Striped', 'Cotton', 'Casual'],
    isFeatured: false,
    isTopSeller: false,
    isNewArrival: false,
    isBestDeal: true,
    isLimitedStock: false,
    isFlashDeal: false,
    isTrending: false,
    stock: 20,
    variants: [
      { size: 'S', color: 'Orange', stock: 8 },
      { size: 'M', color: 'Orange', stock: 12 },
    ],
    averageRating: 4.5,
    numReviews: 156,
    category: {
      name: 'T-Shirts',
      slug: 't-shirts',
    },
    brand: {
      name: 'Shop.Co',
      slug: 'shop-co',
    },
    createdAt: '2024-07-10T16:45:00Z',
  },
];

export const ProductCard = () => {
  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
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
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Grid - Show only first 3 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mockProducts.slice(0, 3).map((product) => {
            const hasDiscount = product.discountPrice && product.discountPrice < product.price;
            const discountPercentage = hasDiscount
              ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
              : 0;

            return (
              <div
                key={product._id}
                className="group cursor-pointer bg-white hover:shadow-lg transition-all duration-300 rounded-[20px] overflow-hidden border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden bg-gray-100">
                  <img
                    className="w-full h-[280px] sm:h-[320px] lg:h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                    src={product.images[0]}
                    alt={product.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
                    }}
                  />

                  {/* Multiple Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {hasDiscount && (
                      <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        -{discountPercentage}%
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {product.isTopSeller && (
                      <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        TOP SELLER
                      </span>
                    )}
                    {product.isTrending && (
                      <span className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        TRENDING
                      </span>
                    )}
                    {product.isLimitedStock && product.stock <= 5 && (
                      <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                        LIMITED
                      </span>
                    )}
                    {product.isFlashDeal && (
                      <span className="bg-yellow-500 text-black text-xs font-medium px-2 py-1 rounded-full">
                        FLASH
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-bold bg-red-600 px-4 py-2 rounded-lg">
                        OUT OF STOCK
                      </span>
                    </div>
                  )}
                  {product.stock > 0 && product.stock <= 5 && product.isLimitedStock && (
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                        Only {product.stock} left
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Category and Brand */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-black/40 text-sm uppercase tracking-wide">
                      {product.category.name}
                    </span>
                    <span className="text-black/40 text-sm font-medium">{product.brand.name}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-black text-lg sm:text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black/60 text-sm mb-3 line-clamp-2">{product.description}</p>

                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-black/60 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Rating and Reviews */}
                  <Rating
                    emptySymbol="fa fa-star-o text-sm text-gray-300"
                    fullSymbol="fa fa-star text-sm text-yellow-400"
                    initialRating={product.averageRating}
                    fractions={2}
                    readonly
                    className="my-[10px]"
                  />
                  {/* Variants Preview */}
                  {product.variants.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-black/60 text-xs">Available:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.variants.slice(0, 4).map((variant, index) => (
                          <span
                            key={index}
                            className="text-xs border border-gray-200 text-black/60 px-2 py-1 rounded"
                          >
                            {variant.size && `${variant.size}`}
                            {variant.size && variant.color && ' • '}
                            {variant.color && `${variant.color}`}
                          </span>
                        ))}
                        {product.variants.length > 4 && (
                          <span className="text-xs text-black/40 px-2 py-1">
                            +{product.variants.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    {hasDiscount ? (
                      <>
                        <span className="text-black text-xl sm:text-2xl font-bold">
                          ${product.discountPrice}
                        </span>
                        <span className="text-black/40 text-xl sm:text-2xl font-bold line-through">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-black text-xl sm:text-2xl font-bold">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    disabled={product.stock === 0}
                    className={`w-full rounded-[62px] py-[12px] px-[24px] font-medium transition-all duration-300 ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="border border-black/10 rounded-[62px] py-[16px] px-[54px] text-black font-medium hover:bg-black hover:text-white transition-all duration-300">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};
