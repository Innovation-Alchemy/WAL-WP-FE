import React from 'react';
import StoreCategoryFilter from '@/components/store-category-filter';
import { RiveHero } from '@/rive-components/hero';
import StoreSection from '@/components/store-section';
import StoreBanner from '@/components/store-banner';

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
          category: 'Shirts',
        },
        {
          title: 'Product 2',
          price: 25,
          image: 'https://via.placeholder.com/150',
          category: 'Hoodies',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Shoes',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 4',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Hats',
        },
        {
          title: 'Product 4',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Hats',
        },
        {
          title: 'Product 4',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Hats',
        },
        {
          title: 'Product 4',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Hats',
        },
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
          category: 'Shirts',
        },
        {
          title: 'Product 5',
          price: 25,
          image: 'https://via.placeholder.com/150',
          category: 'Hoodies',
        },
        {
          title: 'Product 6',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Shoes',
        },
        {
          title: 'Product 9',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 10',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Rings',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 3',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
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
          category: 'Shirts',
        },
        {
          title: 'Product 8',
          price: 25,
          image: 'https://via.placeholder.com/150',
          category: 'Hoodies',
        },
        {
          title: 'Product 9',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Shoes',
        },
        {
          title: 'Product 9',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Bracelets',
        },
        {
          title: 'Product 10',
          price: 30,
          image: 'https://via.placeholder.com/150',
          category: 'Hats',
        },
      ],
    },
  },
];

const banners = [
  {
    src: '/images/store.png',
    alt: 'Order Online Masefet L Taree2',
  },
  {
    src: '/images/store.png',
    alt: 'Accessories That Show You’re a Fan',
  },
  {
    src: '/images/store.png',
    alt: 'Top Quality Products',
  },
];

const StorePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RiveHero />

      <div>
        <StoreCategoryFilter categories={categories} mockData={mock} />
      </div>

      <div className="pt-8">
        <StoreBanner banners={banners} />
      </div>

      <div className="pt-12 pb-24">
        {mock.map((section, index) => (
          <StoreSection key={index} section={section.section} />
        ))}
      </div>
    </div>
  );
};

export default StorePage;
