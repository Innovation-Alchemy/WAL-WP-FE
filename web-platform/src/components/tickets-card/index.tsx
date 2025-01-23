import React from 'react';
import { useSection } from '@/context/section-context';

interface TicketCardProps {
  section: string;
  seats: string[];
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  section,
  seats,
  totalPrice,
}) => {
  const { sectionStates } = useSection(); // Access sectionStates to get s1Value and s2Value

  const isStanding = section === 'S1' || section === 'S2'; // Check if the section is standing

  const ticketCount =
    section === 'S1' ? sectionStates.s1Value : sectionStates.s2Value; // Get the correct count for standing tickets

  return (
    <div
      className="p-2 rounded-lg shadow-md w-full"
      style={{
        background: 'radial-gradient(circle, #926060 0%, #843434 100%)',
        color: 'white',
        border: 'none',
      }}
    >
      <div className="flex justify-between pb-2">
        <div className="flex flex-col w-1/3">
          <p className="font-bold text-sm">
            {section} - {isStanding ? 'Tickets' : 'Seats'}
          </p>
          {/* <div className="flex flex-wrap gap-1 text-sm opacity-50 seat-list">
            {isStanding
              ? ticketCount // Display ticket count for standing sections
              : seats.map((seat, index) => <span key={index}>{seat}</span>)}
          </div> */}
        </div>

        <hr className="my-2 border-secondary opacity-50" />
      </div>
      <div className="flex flex-col border-t-2 border-black pt-2">
        <p className="font-bold text-sm">Total</p>
        <p className="text-sm opacity-50">{totalPrice}</p>
      </div>
    </div>
  );
};

export default TicketCard;
