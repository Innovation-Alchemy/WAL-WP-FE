import React from 'react';
import EventHero from '@/components/event-hero';
import { RiveTicketingMap } from '@/rive-components/event-map';
import GoogleMap from '@/components/event-map';
import AboutOrganizer from '@/components/about-organizer';

const event = {
  title: 'Dua Lipa',
  categories: [
    'Concert',
    'Music',
    'Performance',
    'Hot',
    'Sensual',
    'Birdwatching',
  ],
  dateFrom: '25 December',
  dateTo: '29 December',
  timeFrom: '3:10 PM',
  timeTo: '6:30 PM',
  location: 'Beirut',
  address: 'Forum De Beirut',
  description:
    'Experience an unforgettable evening as Dua Lipa takes the stage in Beirut! With her captivating presence, powerhouse vocals, and breathtaking performance, this concert promises an electrifying atmosphere and memories that will last forever.',
  additionalInfo: 'Doors open at 12am · Tickets are non-refundable',
  backgroundImage: '/rive/hero/pic 1-3026604.jpeg',
};

const EventPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <EventHero
        title={event.title}
        categories={event.categories}
        dateFrom={event.dateFrom}
        dateTo={event.dateTo}
        timeFrom={event.timeFrom}
        timeTo={event.timeTo}
        location={event.location}
        address={event.address}
        description={event.description}
        additionalInfo={event.additionalInfo}
        backgroundImage={event.backgroundImage}
      />

      <div className="flex flex-col justify-center items-center min-h-[350px]">
        <RiveTicketingMap />
      </div>

      <GoogleMap />

      <AboutOrganizer />
    </div>
  );
};

export default EventPage;
