import React from 'react';
import Image from 'next/image';

interface BannerProps {
  banners: { src: string; alt: string; className?: string }[];
}

const StoreBanner: React.FC<BannerProps> = ({ banners }) => {
  return (
    <div className="flex container mx-auto px-32 gap-4 h-[500px]">
      {/* First Banner */}
      <div className="relative md:col-span-2 w-1/2 h-full bg-black rounded-lg overflow-hidden">
        <Image
          src={banners[0].src}
          alt={banners[0].alt}
          fill
          objectFit="cover"
          className="rounded-lg cursor-pointer"
        />
        <div className="absolute bottom-4 left-4 text-white text-lg md:text-xl font-semibold">
          {banners[0].alt}
        </div>
      </div>

      {/* Other Banners */}
      <div className="flex flex-col w-1/2 gap-4">
        {banners.slice(1).map((banner, index) => (
          <div
            key={index}
            className="relative w-full h-1/2 bg-black rounded-lg overflow-hidden"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              objectFit="cover"
              className="rounded-lg cursor-pointer"
            />
            <div className="absolute bottom-4 left-4 text-white text-sm md:text-base font-semibold">
              {banner.alt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreBanner;
