import React, { useRef, useEffect, useState } from 'react';
import { RiveEventCard } from '@/rive-components/event-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface EventCategoryProps {
  title: string;
}

interface Event {
  id: number;
  organizer_id: number;
  title: string;
  description: string;
  date_time: string;
  location: string;
  ticket_maps: string | null;
  commission: string;
  tags: string;
  image: string;
  is_approved: boolean;
  active: boolean;
  status: string;
  total_revenue: string;
  createdAt: string;
  updatedAt: string;
  Tags: string[]; // Replace `any` with a specific type if the structure of Tags is known
  Reports: string[]; // Replace `any` with a specific type if the structure of Reports is known
}

const EventCategory: React.FC<EventCategoryProps> = ({ title }) => {
  const [events, setEvents] = useState<Event[]>([]); // Move useState here
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const baseURL = 'https://wal-wp-be.onrender.com';
  // Fetch events inside useEffect
  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axios.get(`${baseURL}/api/events`, {
          headers: {
        Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
     
    }

    fetchEvents();
  }, []);

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
          {events.map((event) => (
            <div key={event.id} className="eventCardMain">
              <RiveEventCard 
              id={event.id}
              title={event.title}
               description={event.description}
               date_time={event.date_time}
              image={event.image}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategory;