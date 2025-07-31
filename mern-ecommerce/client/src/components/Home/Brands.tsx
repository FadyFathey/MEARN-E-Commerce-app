import React from 'react';
import gucci from '../../assets/gucci.svg';
import versace from '../../assets/versace.svg';
import clevinclain from '../../assets/clevinclain.svg';
import prada from '../../assets/prada.svg';
import zara from '../../assets/zara.svg';

const Brands = () => {
  return (
    <section className="bg-black w-full py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 place-items-center text-center">
          <img
            src={versace}
            alt="versace"
            className="max-w-[166.48px] max-h-[33.16px] w-full object-contain"
          />
          <img
            src={zara}
            alt="zara"
            className="max-w-[166.48px] max-h-[33.16px] w-full object-contain"
          />
          <img
            src={gucci}
            alt="gucci"
            className="max-w-[166.48px] max-h-[33.16px] w-full object-contain"
          />
          <img
            src={prada}
            alt="prada"
            className="max-w-[166.48px] max-h-[33.16px] w-full object-contain"
          />
          <img
            src={clevinclain}
            alt="clevinclain"
            className="max-w-[166.48px] max-h-[33.16px] w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Brands;
