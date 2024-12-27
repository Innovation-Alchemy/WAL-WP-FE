import React from 'react';
// import StoreHero from '@/components/store-hero';
import StoreCategoryFilter from '@/components/store-category-filter';
import { RiveHero } from '@/rive-components/hero';
import StoreSection from '@/components/store-section';

const categories = ['Shirts', 'Hoodies', 'Shoes', 'Bracelets', 'Hats', 'Rings'];

const mock = [
  {
    section: {
      title: 'Section 1',
      products: [
        {
          title: 'Product 1',
          price: 20,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 2',
          price: 25,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
        },
        // {
        //   title: 'Product 3',
        //   price: 30,
        //   image: 'https://via.placeholder.com/150',
        // },
      ],
    },
  },
  {
    section: {
      title: 'Section 2',
      products: [
        {
          title: 'Product 4',
          price: 20,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 5',
          price: 25,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 6',
          price: 30,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 9',
          price: 30,
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
  },
  {
    section: {
      title: 'Section 3',
      products: [
        {
          title: 'Product 7',
          price: 20,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 8',
          price: 25,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 9',
          price: 30,
          image: 'https://via.placeholder.com/150',
        },
        {
          title: 'Product 9',
          price: 30,
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
  },
];

const StorePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RiveHero />

      <div>
        <StoreCategoryFilter categories={categories} />
      </div>

      <div className="py-8">
        {mock.map((section, index) => (
          <StoreSection key={index} section={section.section} />
        ))}
      </div>
    </div>
  );
};

export default StorePage;
