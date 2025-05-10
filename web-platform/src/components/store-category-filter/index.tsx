'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  title: string;
  price: number;
  image: string;
  category: string;
};

type Section = {
  title: string;
  products: Product[];
};

type MockData = {
  section: Section;
}[];

interface StoreCategoryFilterProps {
  categories: string[];
  mockData: MockData;
}

const StoreCategoryFilter: React.FC<StoreCategoryFilterProps> = ({
  categories,
  mockData,
}) => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    const relatedProducts = mockData
      .flatMap((section) => section.section.products)
      .filter((product) => product.category.toLowerCase() === category);

    const productsQuery = encodeURIComponent(JSON.stringify(relatedProducts));

    router.push(`/store/${category}?products=${productsQuery}`);
  };

  return (
    <div className="pt-8 container mx-auto px-12">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-primary mb-4 lg:mb-0">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-primary text-secondary py-2 px-6 rounded-md font-semibold hover:bg-red-400 transition duration-200"
              onClick={() => handleCategoryClick(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreCategoryFilter;
