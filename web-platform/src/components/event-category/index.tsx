import React from 'react';
import { RiveEventCard } from '@/riveComponents/event-card';

interface EventCategoryProps {
  title: string;
  events: number[];
}

const EventCategory: React.FC<EventCategoryProps> = ({ title, events }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-bold mb-4 text-primary">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-thin items-center transition-all duration-300 hover:pb-52">
        {events.map((_, index) => (
          <div key={index} className="flex-shrink-0 w-64 h-40">
            <RiveEventCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCategory;
