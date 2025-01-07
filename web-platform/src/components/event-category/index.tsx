import React from 'react';
import { RiveEventCard } from '@/rive-components/event-card';

interface EventCategoryProps {
  title: string;
}

const mockEvents = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));

const EventCategory: React.FC<EventCategoryProps> = ({ title }) => {
  return (
    <div className="mainEventSection px-6 md:px-8">
      <h1 className="text-xl font-bold text-primary">{title}</h1>
      <div className="secondEventSection">
        <div className="wrapper">
          {mockEvents.map((event) => (
            <div key={event.id} className="eventCardMain">
              <RiveEventCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategory;
