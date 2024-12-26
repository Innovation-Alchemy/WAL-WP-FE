import React from 'react';
import EventHero from '@/components/event-hero';
import { RiveTicketingMap } from '@/rive-components/event-map';
import GoogleMap from '@/components/event-map';
import AboutOrganizer from '@/components/about-organizer';
import EventHours from '@/components/event-hours';
import EventDescription from '@/components/event-description';
import EventTags from '@/components/event-tags';

const event = {
  title: 'Dua Lipa',
  subtitle: 'The Explora',
  tags: [
    'Concert',
    'Music',
    'Performance',
    'Hot',
    'Sensual',
    'Birdwatching',
    'Dancing',
    'Singing',
  ],
  hours: [
    'December 25, 2021 3:10 PM - 6:30 PM',
    'December 26, 2021 3:10 PM - 6:30 PM',
    'December 27, 2021 3:10 PM - 6:30 PM',
  ],

  location: 'Beirut',
  address: 'Forum De Beirut - Charles Helou, Beirut, Lebanon',
  description:
    'Experience an unforgettable evening as Dua Lipa takes the stage in Beirut! With her captivating presence, powerhouse vocals, and breathtaking performance, this concert promises an electrifying atmosphere and memories that will last forever. Doors open at 12am · Tickets are non-refundable',
  backgroundImage: '/rive/hero/pic 1-3026604.jpeg',
};

const EventPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <EventHero
        title={event.title}
        subtitle={event.subtitle}
        address={event.address}
        backgroundImage={event.backgroundImage}
      />

      <div className="flex flex-col justify-center items-center lg:min-h-[450px] pt-8">
        <RiveTicketingMap />
      </div>

      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row container mx-auto py-8 px-6 md:space-x-12">
        <div className="flex flex-col md:w-2/5 space-y-6">
          <EventDescription description={event.description} />
          <EventHours hours={event.hours} />
          <AboutOrganizer />
        </div>
        <div className="flex flex-col md:w-3/5 space-y-6">
          <GoogleMap />
          <EventTags tags={event.tags} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
