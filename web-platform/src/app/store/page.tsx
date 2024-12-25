import React from 'react';
import StoreHero from '@/components/store-hero';
import StoreCategoryFilter from '@/components/store-category-filter';

const categories = ['Shirts', 'Hoodies', 'Shoes', 'Bracelets', 'Hats', 'Rings'];

const StorePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <StoreHero />

      <div>
        <StoreCategoryFilter categories={categories} />
      </div>
    </div>
  );
};

export default StorePage;
