import React from 'react';
import { RiveHero } from '../../rive-components/hero';
import EventCategory from '@/components/event-category';

const EventsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RiveHero />
      <div className="pt-12 pb-[135px] flex flex-col justify-between">
        <EventCategory title="Concerts" />
        <EventCategory title="Stand Up" />
        <EventCategory title="Festival" />
        <EventCategory title="Racing" />
      </div>
    </div>
  );
};

export default EventsPage;
