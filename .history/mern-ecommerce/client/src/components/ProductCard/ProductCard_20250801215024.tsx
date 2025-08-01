import React from 'react';
import dummtproductimg from '../../assets/dummtproductimg.png';

const ProductCard = () => {
  return (
    <section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-[22px]">
        <div className="max-w-[296px] mx-auto">
          <img
            className="mb-[10px] border rounded-[73px] w-full h-[444px] object-cover"
            src={dummtproductimg}
            alt="Product T-shirt with tape details"
          />
          <h3 className="text-black text-xl font-bold text-center">T-SHIRT WITH TAPE DETAILS</h3>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
