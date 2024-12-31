import React from 'react';
import { RiveEventCard } from '@/rive-components/event-card';

interface EventCategoryProps {
  title: string;
}

const mockEvents = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));

const EventCategory: React.FC<EventCategoryProps> = ({ title }) => {
  return (
    <section className=" mainEventSection">
      <h2 className="text-xl font-bold text-primary">{title}</h2>
      <div className=" overflow-x-auto secondEventSection">
        {mockEvents.map((event) => (
          <div key={event.id} className="eventCardMain">
            <RiveEventCard />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventCategory;
