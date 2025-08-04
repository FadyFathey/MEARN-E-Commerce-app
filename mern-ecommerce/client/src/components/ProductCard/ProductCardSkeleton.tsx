import React from 'react';

interface ProductCardSkeletonProps {
  count?: number;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 4 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skeletons.map((index) => (
            <div
              key={index}
              data-skeleton="product-card"
              className="group cursor-pointer bg-white hover:shadow-lg transition-all duration-300 rounded-[20px] overflow-hidden border border-gray-100"
            >
              {/* Product Image Skeleton */}
              <div className="relative mb-4 overflow-hidden bg-gray-100">
                <div className="w-full h-[280px] sm:h-[320px] lg:h-[350px] bg-gray-200 animate-pulse" />

                {/* Badges Skeleton */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <div className="w-12 h-6 bg-gray-300 animate-pulse rounded-full" />
                  <div className="w-10 h-6 bg-gray-300 animate-pulse rounded-full" />
                </div>

                {/* Stock Status Skeleton (optional) */}
                <div className="absolute bottom-3 right-3">
                  <div className="w-20 h-6 bg-gray-300 animate-pulse rounded-full" />
                </div>
              </div>

              {/* Product Info Skeleton */}
              <div className="p-4">
                {/* Category and Brand Skeleton */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                  <div className="w-12 h-4 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* Product Title Skeleton */}
                <div className="mb-2">
                  <div className="w-full h-5 bg-gray-200 animate-pulse rounded mb-1" />
                  <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* Description Skeleton */}
                <div className="mb-3">
                  <div className="w-full h-4 bg-gray-200 animate-pulse rounded mb-1" />
                  <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <div className="w-12 h-6 bg-gray-200 animate-pulse rounded-full" />
                  <div className="w-16 h-6 bg-gray-200 animate-pulse rounded-full" />
                  <div className="w-14 h-6 bg-gray-200 animate-pulse rounded-full" />
                </div>

                {/* Rating Stars Skeleton */}
                <div className="flex items-center gap-1 my-[10px]">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
                  ))}
                </div>

                {/* Variants Preview Skeleton */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-16 h-3 bg-gray-200 animate-pulse rounded" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <div className="w-12 h-6 bg-gray-200 animate-pulse rounded border" />
                    <div className="w-14 h-6 bg-gray-200 animate-pulse rounded border" />
                    <div className="w-10 h-6 bg-gray-200 animate-pulse rounded border" />
                    <div className="w-16 h-6 bg-gray-200 animate-pulse rounded border" />
                  </div>
                </div>

                {/* Price Skeleton */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-16 h-6 bg-gray-200 animate-pulse rounded" />
                  <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* Add to Cart Button Skeleton */}
                <div className="w-full h-12 bg-gray-200 animate-pulse rounded-[62px]" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Skeleton */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-block w-32 h-12 bg-gray-200 animate-pulse rounded-[62px]" />
        </div>
      </div>
    </section>
  );
};
