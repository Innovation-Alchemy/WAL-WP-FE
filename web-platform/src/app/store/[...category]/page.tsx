'use client';

import React, { useEffect, useState } from 'react';
import { RiveHero } from '@/rive-components/hero';
import { useParams, useSearchParams } from 'next/navigation';
import { RiveProductCard } from '@/rive-components/store/product-card';
import SortFilter from '@/components/sort-filter';

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const { category } = useParams();

  const productsParam = searchParams.get('products');
  const products = productsParam
    ? JSON.parse(decodeURIComponent(productsParam))
    : [];

  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState<number>(4);
  const [sortOption, setSortOption] = useState<string>('Popular');
  const [sortedProducts, setSortedProducts] = useState<any[]>(products);

  const sortOptions = ['Popular', 'Price: Low to High', 'Price: High to Low'];

  const handleActivate = (index: number) => {
    setActiveCardIndex(index);
  };

  const handleDeactivate = (index: number) => {
    if (activeCardIndex === index) {
      setActiveCardIndex(null);
    }
  };

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) setColumns(1); // Small screens
      else if (width < 1024) setColumns(2); // Medium screens
      else if (width < 1280) setColumns(3); // Large screens
      else setColumns(4); // Extra-large screens
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const rows: any[][] = [];
  for (let i = 0; i < products.length; i += columns) {
    rows.push(products.slice(i, i + columns));
  }

  return (
    <div>
      <RiveHero />

      <div className="pt-16 pb-12 px-12">
        <p className="text-secondary font-bold">Store / {category}</p>

        <div className="flex flex-col md:flex-row md:py-12">
          <div className="w-full md:w-1/5 bg-primary h-35 md:h-[600px] rounded-lg"></div>
          <div className="w-full md:w-4/5 md:px-8 pt-8 md:pt-0">
            <div className=" mx-12 md:mx-0 mb-28">
              <SortFilter
                options={sortOptions}
                selectedOption={sortOption}
                onChange={setSortOption}
              />
            </div>

            <div className="md:hidden flex overflow-x-scroll overflow-y-hidden scrollbar-hide gap-4 relative">
              {products.map((product: any, index: number) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center"
                >
                  <RiveProductCard
                    isActive={activeCardIndex === index}
                    onActivate={() => handleActivate(index)}
                    onDeactivate={() => handleDeactivate(index)}
                  />
                </div>
              ))}
            </div>

            <div className="hidden md:block">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex h-[280px] gap-4">
                  {row.map((product, productIndex) => {
                    const globalIndex = rowIndex * columns + productIndex;
                    return (
                      <div
                        key={globalIndex}
                        className="flex justify-center items-center h-full"
                      >
                        <RiveProductCard
                          isActive={activeCardIndex === globalIndex}
                          onActivate={() => handleActivate(globalIndex)}
                          onDeactivate={() => handleDeactivate(globalIndex)}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
