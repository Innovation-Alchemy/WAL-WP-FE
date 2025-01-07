'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { RiveProductCard } from '@/rive-components/store/product-card';

type Product = { title: string; price: number; image: string };

interface StoreSectionProps {
  section: { title: string; products: Product[] };
}

const StoreSection: React.FC<StoreSectionProps> = ({ section }) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const handleActivate = (index: number) => {
    setActiveCardIndex(index);
  };

  const handleDeactivate = (index: number) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-32">
      <div className="flex justify-between items-center">
        <p className="py-2 text-primary text-lg font-bold">{section.title}</p>
        <Link href={`/store`} className="text-primary hover:underline">
          View More
        </Link>
      </div>

      <div className="product-section">
        <div className="product-wrapper">
          {section.products.slice(0, 4).map((product, index) => (
            <div key={index} className="eventCardMain">
              <RiveProductCard
                isActive={activeCardIndex === index}
                onActivate={() => handleActivate(index)}
                onDeactivate={() => handleDeactivate(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
