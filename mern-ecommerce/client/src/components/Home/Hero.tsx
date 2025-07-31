import React from 'react';
import Button from '../ui/button';
import heroimg from '../../assets/heroimg.jpg';

const Hero = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 bg-[rgba(242,240,241,1)]">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Left side hero section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold text-black leading-tight mb-4 sm:mb-6 lg:mb-8">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-normal mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
            Browse through our diverse range of meticulously crafted garments, designed to bring out
            your individuality and cater to your sense of style.
          </p>

          <div className="mb-8 sm:mb-12">
            <div className="mb-8 sm:mb-12">
              <Button className="w-full sm:w-auto lg:rounded-[64px] py-[16px] px-[64px] text-base sm:text-lg">
                Shop Now
              </Button>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1">200+</h3>
              <span className="text-xs sm:text-sm lg:text-base text-gray-600 block whitespace-nowrap">
                International Brands
              </span>
            </div>

            <div className="text-center lg:text-left sm:border-l sm:border-r sm:border-gray-200 sm:px-3 md:px-4 lg:px-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1">2,000+</h3>
              <span className="text-xs sm:text-sm lg:text-base text-gray-600 block whitespace-nowrap">
                High-Quality Products
              </span>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1">
                30,000+
              </h3>
              <span className="text-xs sm:text-sm lg:text-base text-gray-600 block whitespace-nowrap">
                Happy Customers
              </span>
            </div>
          </div>
        </div>

        {/* Right side hero section */}
        <div className="flex-1 w-full max-w-md lg:max-w-none mx-auto">
          <div className="relative">
            <img
              src={heroimg}
              alt="Fashion models wearing stylish clothes"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover object-center rounded-lg lg:rounded-xl shadow-lg"
            />
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-black transform rotate-45 hidden sm:block"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-black transform rotate-45 hidden sm:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
