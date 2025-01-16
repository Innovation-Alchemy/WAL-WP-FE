'use client';
import React from 'react';
import { RiveHero } from '../../rive-components/hero';
import EventCategory from '@/components/event-category';
import { useSearch } from '@/context/search-context';
import GenreFilter from '@/components/genre-filter';
import RangeFilter from '@/components/range-filter';

const EventsPage = () => {
  const { isSearchOpen } = useSearch();

  return (
    <div className="flex flex-col min-h-screen">
      {!isSearchOpen && (
        <>
          <RiveHero />
          <div className="pt-24 pb-24 flex flex-col justify-between w-screen">
            <EventCategory title="Concerts" />
            <EventCategory title="Stand Up" />
            <EventCategory title="Festival" />
            <EventCategory title="Racing" />
          </div>
        </>
      )}

      {isSearchOpen && (
        <div className="flex pt-24 pb-24 gap-2 px-8 w-screen">
          <div className="w-1/5 flex flex-col gap-4">
            <GenreFilter />

            <RangeFilter
              label="Time Range"
              min={0}
              max={24}
              initialStart={6}
              initialEnd={18}
              unit="h"
            />

            <RangeFilter
              label="Price Range"
              min={0}
              max={1000}
              initialStart={200}
              initialEnd={800}
              unit="$"
            />
          </div>
          <div className="w-4/5">
            <EventCategory title="Concerts" />
            <EventCategory title="Stand Up" />
            <EventCategory title="Festival" />
            <EventCategory title="Racing" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
