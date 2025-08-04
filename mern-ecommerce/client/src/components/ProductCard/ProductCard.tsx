import React from 'react';
import type { IProduct } from '../../types/prodcut';
import type { RatingComponentProps } from '../../types/rating';
import Rating from 'react-rating';
import { useGetNewArrivalsQuery } from '@/store/features/products/productApiSlice';
import { ProductCardSkeleton } from './ProductCardSkeleton';

// Mock product data
const mockProducts: IProduct[] = [];
type ProductCardProps = {
  queryParam: string;
};
export const ProductCard = ({ queryParam }: ProductCardProps) => {
  const { data, isLoading, isError } = useGetNewArrivalsQuery({
    queryParam: queryParam,
    page: 1,
    limit: 3,
  });
  const products: IProduct[] = data || mockProducts;
  const RatingComponent = Rating as React.ComponentType<RatingComponentProps>;

  if (isLoading) return <ProductCardSkeleton count={3} />;
  if (isError || !products.length) return <p>Error fetching products.</p>;

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => {
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
                  <RatingComponent
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
