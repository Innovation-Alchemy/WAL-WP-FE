import React, { useRef } from 'react';
import { RiveEventCard } from '@/rive-components/event-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface EventCategoryProps {
  title: string;
}

const mockEvents = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }));

const EventCategory: React.FC<EventCategoryProps> = ({ title }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 3. Handlers to scroll left/right
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="mainEventSection">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-primary px-4 md:px-8">{title}</h1>

        <div className="flex items-center pr-4">
          <button
            onClick={scrollLeft}
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-transparent 
              text-secondary
              cursor-pointer
            "
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
          </button>

          <button
            onClick={scrollRight}
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-transparent 
              text-secondary
              cursor-pointer
            "
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="secondEventSection relative">
        <div ref={scrollContainerRef} className="wrapper px-4 md:px-8">
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
