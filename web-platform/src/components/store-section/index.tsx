'use client';
import { RiveProductCard } from '@/rive-components/store/product-card';
import Rive from '@rive-app/react-canvas';
import Link from 'next/link';
import React, { useState } from 'react';

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
    <div className="container mx-auto px-32">
      <div className="flex justify-between">
        <p className="py-2 text-primary text-lg font-bold">{section.title}</p>
        <Link href={`/store`} className="text-primary hover:underline">
          View More
        </Link>
      </div>
      <div className="flex justify-between">
        {section.products.map((product, index) => (
          <RiveProductCard
            key={index}
            isActive={activeCardIndex === index}
            onActivate={() => handleActivate(index)}
            onDeactivate={() => handleDeactivate(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreSection;
