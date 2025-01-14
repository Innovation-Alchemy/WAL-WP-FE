'use client';
import React, { useState } from 'react';
import EventHero from '@/components/event-hero';
import { RiveTicketingMap } from '@/rive-components/event-map';
import GoogleMap from '@/components/event-map';
import AboutOrganizer from '@/components/about-organizer';
import EventDescription from '@/components/event-description';
import EventTags from '@/components/event-tags';
import EventSelect from '@/components/event-select';
import EventCard from '@/components/event-card';
import TicketCard from '@/components/tickets-card';

interface Ticket {
  section: string;
  seat: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
}

interface GroupedTicket {
  section: string;
  seats: string[];
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
}

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
  schedule: [
    {
      date: '2/12/2021',
      day: 'Thursday',
      startTimes: ['12:00 PM', '2:00 PM'],
      endTimes: ['1:30 PM', '3:30 PM'],
    },
    {
      date: '3/12/2021',
      day: 'Friday',
      startTimes: ['1:00 PM', '3:00 PM', '5:00 PM'],
      endTimes: ['2:30 PM', '4:30 PM', '6:30 PM'],
    },
    {
      date: '4/12/2021',
      day: 'Saturday',
      startTimes: ['2:00 PM'],
      endTimes: ['3:30 PM'],
    },
  ],
  duration: '1 hour 30 minutes',
  location: 'Beirut',
  address: 'Forum De Beirut - Charles Helou, Beirut, Lebanon',
  description:
    'Experience an unforgettable evening as Dua Lipa takes the stage in Beirut! With her captivating presence, powerhouse vocals, and breathtaking performance, this concert promises an electrifying atmosphere and memories that will last forever. Doors open at 12am · Tickets are non-refundable',
  backgroundImage: '/rive/hero/pic 1-3026604.jpeg',
};

const tickets = [
  {
    section: 'C',
    seat: 'C1',
    date: '25-1',
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    price: 20,
  },
  {
    section: 'C',
    seat: 'C2',
    date: '25-1',
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    price: 20,
  },
  {
    section: 'C',
    seat: 'C3',
    date: '25-1',
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    price: 20,
  },
  {
    section: 'A',
    seat: 'A1',
    date: '26-1',
    startTime: '8:30 PM',
    endTime: '10:30 PM',
    price: 30,
  },
  {
    section: 'A',
    seat: 'A2',
    date: '26-1',
    startTime: '8:30 PM',
    endTime: '10:30 PM',
    price: 30,
  },
  // {
  //   section: 'A',
  //   seat: 'A3',
  //   date: '26-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A5',
  //   date: '27-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A8',
  //   date: '28-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A3',
  //   date: '26-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A3',
  //   date: '26-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A3',
  //   date: '26-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A3',
  //   date: '26-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A3',
  //   date: '26-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
  // {
  //   section: 'A',
  //   seat: 'A3',
  //   date: '26-1',
  //   startTime: '10:30 PM',
  //   endTime: '12:00 AM',
  //   price: 30,
  // },
];

const groupTickets = (tickets: Ticket[]): GroupedTicket[] => {
  const grouped: Record<string, GroupedTicket> = {};

  tickets.forEach((ticket) => {
    const { section, date, startTime } = ticket;
    const key = `${section}-${date}-${startTime}`;

    if (!grouped[key]) {
      grouped[key] = {
        section: ticket.section,
        seats: [],
        date: ticket.date,
        startTime: ticket.startTime,
        endTime: ticket.endTime,
        totalPrice: 0,
      };
    }

    grouped[key].seats.push(ticket.seat);
    grouped[key].totalPrice += ticket.price;
  });

  return Object.values(grouped);
};

const EventPage = () => {
  const [selectedDate, setSelectedDate] = useState(event.schedule[0].date);
  const [selectedTime, setSelectedTime] = useState(
    event.schedule[0].startTimes[0],
  );
  const [selectedEndTime, setSelectedEndTime] = useState(
    event.schedule[0].endTimes[0],
  );

  const groupedTickets = groupTickets(tickets);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const relatedSchedule = event.schedule.find(
      (schedule) => schedule.date === date,
    );
    if (relatedSchedule) {
      setSelectedTime(relatedSchedule.startTimes[0] || '');
      setSelectedEndTime(relatedSchedule.endTimes[0] || '');
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);

    const relatedSchedule = event.schedule.find(
      (schedule) => schedule.date === selectedDate,
    );

    if (relatedSchedule) {
      const timeIndex = relatedSchedule.startTimes.indexOf(time);
      setSelectedEndTime(relatedSchedule.endTimes[timeIndex] || '');
    }
  };

  const getStartTimesForSelectedDate = () => {
    return (
      event.schedule.find((schedule) => schedule.date === selectedDate)
        ?.startTimes || []
    );
  };

  const selectedSchedule = event.schedule.find(
    (schedule) => schedule.date === selectedDate,
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <EventHero
        title={event.title}
        subtitle={event.subtitle}
        address={event.address}
        backgroundImage={event.backgroundImage}
      />

      {event.schedule.length > 1 && (
        <div className="flex items-center justify-center pt-12 w-full gap-4">
          <EventSelect
            options={event.schedule.map((schedule) => schedule.date)}
            selectedOption={selectedDate}
            onChange={handleDateChange}
          />

          <EventSelect
            options={getStartTimesForSelectedDate()}
            selectedOption={selectedTime}
            onChange={handleTimeChange}
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row md:gap-8 justify-center px-8 pt-12 items-center">
        <div className="flex items-center justify-center">
          <RiveTicketingMap />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-[280px] md:w-[380px]">
          <EventCard
            location={event.location}
            address={event.address}
            date={selectedDate}
            day={selectedSchedule?.day || ''}
            startTime={selectedTime}
            endTime={selectedEndTime}
            duration={event.duration}
            image={event.backgroundImage}
          />
          {groupedTickets.map((group, index) => (
            <TicketCard
              key={index}
              section={group.section}
              seats={group.seats}
              date={group.date}
              startTime={group.startTime}
              endTime={group.endTime}
              totalPrice={`${group.totalPrice}$`}
            />
          ))}
          <GoogleMap />
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row container mx-auto py-8 px-6 md:space-x-12">
        <div className="flex flex-col md:w-2/5 space-y-6">
          {/* <EventDescription description={event.description} /> */}
          <AboutOrganizer />
        </div>
        <div className="flex flex-col md:w-3/5 space-y-6">
          <EventTags tags={event.tags} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
