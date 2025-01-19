'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Updated hook for Next.js routing
import EventHero from '@/components/event-hero';
import { RiveTicketingMap } from '@/rive-components/event-map';
import { RiveTicketing } from '@/rive-components/event-map-tickets';
import { SectionProvider, useSection } from '../../../utils/SectionContext';
import TicketCard from '@/components/tickets-card';
import TotalPriceCard from '@/components/total-price-card';
import EventSelect from '@/components/event-select';
import GoogleMap from '@/components/event-map';
import AboutOrganizer from '@/components/about-organizer';
import EventTags from '@/components/event-tags';
import axios from 'axios';
import EventDescription from '@/components/event-description';
import { usePathname } from 'next/navigation';
interface Ticket {
  section: string;
  seat: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  count?: number;
}

const tickets: Ticket[] = [
  { section: 'A', seat: 'A1', date: '25-1', startTime: '6:00 PM', endTime: '8:00 PM', price: 50 },
  { section: 'A', seat: 'A2', date: '25-1', startTime: '6:00 PM', endTime: '8:00 PM', price: 50 },
  { section: 'A', seat: 'A3', date: '25-1', startTime: '6:00 PM', endTime: '8:00 PM', price: 50 },
  { section: 'A', seat: 'A4', date: '25-1', startTime: '6:00 PM', endTime: '8:00 PM', price: 50 },
  { section: 'A', seat: 'A5', date: '25-1', startTime: '6:00 PM', endTime: '8:00 PM', price: 50 },
  { section: 'S1', seat: '', date: '25-1', startTime: '6:00 PM', endTime: '8:00 PM', price: 40, count: 0 },
  { section: 'S2', seat: '', date: '25-1', startTime: '6:00 PM', endTime: '8:00 PM', price: 30, count: 0 },
];
// const event = {
//   title: 'Dua Lipa',
//   subtitle: 'The Explora',
//   tags: [
//     'Concert',
//     'Music',
//     'Performance',
//     'Hot',
//     'Sensual',
//     'Birdwatching',
//     'Dancing',
//     'Singing',
//   ],
//   schedule: [
//     {
//       date: '18/01/2025',
//       day: 'Saturday',
//       startTimes: ['08:00 AM'],
//       endTimes: ['09:30 PM'],
//     },
//     {
//       date: '19/01/2025',
//       day: 'Saturday',
//       startTimes: ['01:00 PM'],
//       endTimes: ['03:30 PM'],
//     }
//   ],
//   address: 'Forum De Beirut - Charles Helou, Beirut, Lebanon',
//   description:
//     'Experience an unforgettable evening as Dua Lipa takes the stage in Beirut! With her captivating presence, powerhouse vocals, and breathtaking performance, this concert promises an electrifying atmosphere and memories that will last forever. Doors open at 12am · Tickets are non-refundable',
//   backgroundImage: '/rive/hero/pic 1-3026604.jpeg',
// };
const EventPageContent = () => {
  const [event, setEvent] = useState<{
    title: string;
    subtitle: string;
    tags: string[];
    schedule: { date: string; day: string; startTimes: string[]; endTimes: string[] }[];
    address: string;
    description: string;
    backgroundImage: string;
  } | null>(null);

  const pathname = usePathname();
  const id = pathname.split('/').pop();
  useEffect(() => {
    if (!id) return; // Avoid fetching if `id` is not available

    async function fetchEventDetails() {
      try {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const response = await axios.get(`https://wal-wp-be.onrender.com/api/events/${id}`, {
          headers: {
        Authorization: `Bearer ${token}`,
          },
        });
        const eventData = response.data.data;
        console.log('eventData', event);
        // Transform date_time into schedule
        const dateTimeArray = JSON.parse(eventData.date_time);
        const schedule = dateTimeArray.reduce((acc: any[], dateTime: string) => {
          const [datePart, timePart] = dateTime.split('T');
          const [startTime, endTime] = timePart.split('T');

          const formattedDate = new Date(datePart).toLocaleDateString('en-GB');
          const dayName = new Date(datePart).toLocaleDateString('en-GB', { weekday: 'long' });

          const existingDate = acc.find((entry) => entry.date === formattedDate);
          if (existingDate) {
        existingDate.startTimes.push(new Date(`1970-01-01T${startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        existingDate.endTimes.push(new Date(`1970-01-01T${endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
          } else {
        acc.push({
          date: formattedDate,
          day: dayName,
          startTimes: [
            new Date(`1970-01-01T${startTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          ],
          endTimes: [
            new Date(`1970-01-01T${endTime}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          ],
        });
          }

          return acc;
        }, []);

        // Set the event state
        setEvent({
          title: eventData.title,
          subtitle: '', // Subtitle is empty
          tags: JSON.parse(eventData.tags),
          schedule,
          address: JSON.parse(eventData.location).address,
          description: eventData.description,
          backgroundImage: '/rive/hero/pic 1-3026604.jpeg',
        });
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    }

    fetchEventDetails();
  }, [id]);
  
  const { sectionStates } = useSection(); // Access sectionStates from context
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedDate, setSelectedDate] = useState(event?.schedule[0]?.date || '');
  const [selectedTime, setSelectedTime] = useState(
    event?.schedule[0]?.startTimes[0] || '',
  );
  const [selectedEndTime, setSelectedEndTime] = useState(
    event?.schedule[0]?.endTimes[0] || '',
  );

  const isSingleDate = event?.schedule.length === 1;

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const relatedSchedule = event?.schedule.find(
      (schedule) => schedule.date === date,
    );
    if (relatedSchedule) {
      setSelectedTime(relatedSchedule.startTimes[0] || '');
      setSelectedEndTime(relatedSchedule.endTimes[0] || '');
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);

    const relatedSchedule = event?.schedule.find(
      (schedule) => schedule.date === selectedDate,
    );

    if (relatedSchedule) {
      const timeIndex = relatedSchedule.startTimes.indexOf(time);
      setSelectedEndTime(relatedSchedule.endTimes[timeIndex] || '');
    }
  };

  const getStartTimesForSelectedDate = () => {
    return (
      event?.schedule.find((schedule) => schedule.date === selectedDate)
        ?.startTimes || []
    );
  };

  const selectedSchedule = event?.schedule.find(
    (schedule) => schedule.date === selectedDate,
  );
  useEffect(() => {
    const seats = sectionStates.seats || [];
    const updatedTickets = tickets.filter(
      ticket =>
        seats.includes(ticket.seat) || // Include seated tickets
        ticket.section === 'S1' || // Include standing sections
        ticket.section === 'S2'
    );
    setFilteredTickets(updatedTickets);
  }, [sectionStates.seats]);

  const groupedTickets = filteredTickets.reduce((acc: { [key: string]: any }, ticket) => {
    const key = `${ticket.section}-${ticket.date}-${ticket.startTime}`;
    if (!acc[key]) {
      acc[key] = {
        section: ticket.section,
        seats: [],
        date: ticket.date,
        startTime: ticket.startTime,
        endTime: ticket.endTime,
        totalPrice: 0,
      };
    }

    if (ticket.seat) {
      // Only push seats for seated sections
      acc[key].seats.push(ticket.seat);
    }

    if (ticket.section === 'S1') {
      // Calculate total price for S1
      acc[key].totalPrice = sectionStates.s1Value * ticket.price;
    } else if (ticket.section === 'S2') {
      // Calculate total price for S2
      acc[key].totalPrice = sectionStates.s2Value * ticket.price;
    } else {
      // Add price for seated tickets
      acc[key].totalPrice += ticket.price;
    }

    return acc;
  }, {});

  const overallTotalPrice = Object.values(groupedTickets).reduce(
    (acc: number, group: any) => acc + group.totalPrice,
    0,
  );
  console.log('event', event);
  return (
    <div className="flex flex-col min-h-screen bg-black">
    {event && (
      <EventHero
        title={event.title}
        subtitle={event.subtitle}
        address={event.address}
        backgroundImage={event.backgroundImage}
        date={selectedDate}
        time={selectedTime}
      />
    )}

    {event && event.schedule.length > 1 && (
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
        <RiveTicketing />
        {Object.values(groupedTickets)
          .filter(
            group =>
              group.section !== 'S1' && group.section !== 'S2' // Always show seated cards
                ? true
                : group.section === 'S1'
                ? sectionStates.s1Value > 0 // Show S1 only if count > 0
                : sectionStates.s2Value > 0 // Show S2 only if count > 0
          )
          .map((group: any, index) => (
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
        <TotalPriceCard totalPrice={`${overallTotalPrice}$`} />
        <GoogleMap />
      </div>
    </div>
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row container mx-auto py-8 px-6 md:space-x-12">
        <div className="flex flex-col md:w-2/5 space-y-6">
          {event && <EventDescription description={event.description} />}
          <AboutOrganizer />
        </div>
        <div className="flex flex-col md:w-3/5 space-y-6">
          {event && <EventTags tags={event.tags} />}
        </div>
      </div>
    </div>
  );
};

const EventPage = () => (
  <SectionProvider>
    <EventPageContent />
  </SectionProvider>
);

export default EventPage;