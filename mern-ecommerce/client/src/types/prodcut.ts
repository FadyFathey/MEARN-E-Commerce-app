export interface IProduct {
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
