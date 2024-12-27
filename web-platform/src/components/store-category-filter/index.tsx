import React from 'react';

interface StoreCategoryFilterProps {
  categories: string[];
}

const StoreCategoryFilter: React.FC<StoreCategoryFilterProps> = ({
  categories,
}) => {
  return (
    <div className="py-8 container mx-auto px-12">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-primary mb-4 lg:mb-0">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-primary text-secondary py-2 px-4 rounded-md font-semibold hover:bg-red-400 transition duration-200"
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
