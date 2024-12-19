import React from 'react';
import Image from 'next/image';

const RepeatedLogo = () => {
  return (
    <div className="lg:w-1/2 bg-black relative lg:flex justify-center items-center hidden">
      <div
        className="absolute inset-0 bg-[url('/images/favicon.png')] opacity-10 bg-repeat"
        style={{ backgroundSize: '80px 80px' }}
      ></div>
      <div className="relative w-[140px] h-[140px]">
        <Image
          src="/images/Logo.png"
          alt="Logo"
          className="object-fill"
          objectFit="fill"
          fill
          priority
        />
      </div>
    </div>
  );
};

export default RepeatedLogo;
