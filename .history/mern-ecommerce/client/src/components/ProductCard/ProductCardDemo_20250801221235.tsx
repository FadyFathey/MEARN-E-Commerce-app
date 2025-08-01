import React from 'react';
import ProductCard from './ProductCard';
import dummtproductimg from '../../assets/dummtproductimg.png';

// Demo component to showcase different ProductCard states
const ProductCardDemo: React.FC = () => {
  // Mock products with different states
  const demoProducts = [
    {
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
      category: { name: 'Gaming Accessories', slug: 'gaming-accessories' },
      brand: { name: 'GameTech Pro', slug: 'gametech-pro' },
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      _id: '2',
      title: 'Classic Cotton T-Shirt',
      slug: 'classic-cotton-tshirt',
      description: 'Comfortable and stylish cotton t-shirt for everyday wear',
      images: [dummtproductimg],
      price: 29.99,
      discountPrice: undefined,
      badges: ['New'],
      tags: ['Casual', 'Cotton', 'Comfortable'],
      isFeatured: false,
      isTopSeller: false,
      isNewArrival: true,
      isBestDeal: false,
      isLimitedStock: false,
      isFlashDeal: false,
      isTrending: false,
      stock: 0,
      variants: [
        { size: 'S', color: 'White', stock: 0 },
        { size: 'M', color: 'Black', stock: 0 },
      ],
      averageRating: 4.2,
      numReviews: 45,
      category: { name: 'Clothing', slug: 'clothing' },
      brand: { name: 'Fashion Brand', slug: 'fashion-brand' },
      createdAt: '2024-12-01T10:30:00Z',
    },
    {
      _id: '3',
      title: 'Smart Fitness Watch',
      slug: 'smart-fitness-watch',
      description: 'Advanced fitness tracking with heart rate monitoring and GPS',
      images: [dummtproductimg],
      price: 199.99,
      discountPrice: 149.99,
      badges: ['25% OFF', 'Flash Deal'],
      tags: ['Fitness', 'Smart Watch', 'GPS'],
      isFeatured: true,
      isTopSeller: false,
      isNewArrival: false,
      isBestDeal: false,
      isLimitedStock: true,
      isFlashDeal: true,
      isTrending: true,
      stock: 5,
      variants: [
        { size: '42mm', color: 'Black', stock: 3 },
        { size: '46mm', color: 'Silver', stock: 2 },
      ],
      averageRating: 4.8,
      numReviews: 89,
      category: { name: 'Wearables', slug: 'wearables' },
      brand: { name: 'FitTech', slug: 'fittech' },
      createdAt: '2024-06-15T10:30:00Z',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          ProductCard Component Demo
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {demoProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Features Demonstrated:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>✅ Product images with fallback</div>
            <div>✅ Price and discount display</div>
            <div>✅ Rating stars with reviews</div>
            <div>✅ Stock status indicators</div>
            <div>✅ Multiple badge types</div>
            <div>✅ Category and brand info</div>
            <div>✅ Product tags</div>
            <div>✅ Hover effects and animations</div>
            <div>✅ Dark mode support</div>
            <div>✅ Out of stock overlay</div>
            <div>✅ Quick action buttons</div>
            <div>✅ Responsive design</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDemo;
