import React from 'react';
import { RiveHero } from '../../riveComponents/hero';
import EventCategory from '@/components/event-category';

const EventsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RiveHero />
      <div className="py-8">
        <EventCategory
          title="Concerts"
          events={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        />
        <EventCategory
          title="Stand Up"
          events={[11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
        />
        <EventCategory
          title="Festival"
          events={[21, 22, 23, 24, 25, 26, 27, 28, 29, 30]}
        />
        <EventCategory
          title="Racing"
          events={[31, 32, 33, 34, 35, 63, 37, 38, 39]}
        />
      </div>
    </div>
  );
};

export default EventsPage;
