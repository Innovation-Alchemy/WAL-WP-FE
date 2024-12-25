import React from 'react';
import { RiveEventCard } from '@/rive-components/event-card';

interface EventCategoryProps {
  title: string;
}

const mockEvents = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));

const EventCategory: React.FC<EventCategoryProps> = ({ title }) => {
  return (
    <section className="px-6 mb-24">
      <h2 className="mb-4 text-xl font-bold text-primary">{title}</h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden">
        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="
              w-64      
              h-40      
              flex-shrink-0
          "
          >
            <RiveEventCard />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCategory;
