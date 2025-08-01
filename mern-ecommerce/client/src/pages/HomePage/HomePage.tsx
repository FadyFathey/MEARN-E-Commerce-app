import Brands from '@/components/Home/Brands';
import Hero from '@/components/Home/Hero';
import SectionHeading from '@/components/Home/SectionHeading';
import ProductGrid from '@/components/ProductCard/ProductCard';
// import ProductCard from '@/components/ProductCard/ProductCard';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <SectionHeading title="NEW ARRIVALS" />
      <ProductGrid />
    </>
  );
}
