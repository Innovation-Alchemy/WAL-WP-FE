'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { RiveProductCard } from '@/rive-components/store/product-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type Product = {
  title: string;
  price: number;
  image: string;
  category: string;
};

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
    <div className="container mx-auto px-6 md:px-32 py-2">
      <div className="flex justify-between items-center">
        <p className="py-2 text-primary text-lg font-bold">{section.title}</p>
        <p className="text-primary hover:underline">
          Scroll <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
        </p>
      </div>

      <div className="product-section">
        <div className="flex items-center overflow-x-scroll scrollbar-hide scrollbar-none gap-3">
          {section.products.map((product, index) => (
            <div key={index}>
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
