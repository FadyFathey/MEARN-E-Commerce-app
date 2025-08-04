import Brands from '@/components/Home/Brands';
import BroweseByCategory from '@/components/Home/BroweseByCategory';
import Hero from '@/components/Home/Hero';
import SectionHeading from '@/components/Home/SectionHeading';
import { ProductCard } from '@/components/ProductCard/ProductCard';

// import ProductCard from '@/components/ProductCard/ProductCard';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <SectionHeading title="NEW ARRIVALS" />
      <ProductCard queryParam="new-arrivals" />
      <SectionHeading title="TOP SELLING" />
      <ProductCard queryParam="top-sellers" />
      <BroweseByCategory />
    </>
  );
}
