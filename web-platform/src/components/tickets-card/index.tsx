import React from 'react';

interface TicketCardProps {
  section: string;
  seats: string[];
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  seats,
  date,
  startTime,
  endTime,
  totalPrice,
  section,
}) => {
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
          <p className="font-bold text-sm">Seats</p>
          <div className="flex flex-wrap gap-1 text-sm opacity-50">
            {seats.map((seat, index) => (
              <span key={index}>{seat}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col ">
          <p className="font-bold text-sm">Date</p>
          <p className="text-sm opacity-50">{date}</p>
        </div>

        <div className="flex flex-col ">
          <p className="font-bold text-sm">Time</p>
          <p className="text-sm opacity-50">
            {startTime} &rarr; {endTime}
          </p>
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
