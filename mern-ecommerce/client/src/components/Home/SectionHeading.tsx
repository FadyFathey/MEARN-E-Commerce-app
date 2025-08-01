import React from 'react';

type SectionHeadingProps = {
  title: string;
};

const SectionHeading = ({ title }: SectionHeadingProps) => {
  return (
    <h2 className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[rgba(0,0,0,1)] mt-6 mb-6 sm:mt-8 sm:mb-8 md:mt-10 md:mb-10 font-bold text-center">
      {title}
    </h2>
  );
};

export default SectionHeading;
