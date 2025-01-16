import React from 'react';

interface Ticket {
  section: string;
  seat: string;
  price: number;
}

interface SingleDateTicketsCardProps {
  tickets: Ticket[];
}

const SingleDateTicketsCard: React.FC<SingleDateTicketsCardProps> = ({
  tickets,
}) => {
  // Calculate section totals
  const sectionTotals = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.section]) {
      acc[ticket.section] = { totalPrice: 0, seats: [] };
    }
    acc[ticket.section].totalPrice += ticket.price;
    acc[ticket.section].seats.push(ticket.seat);
    return acc;
  }, {} as Record<string, { totalPrice: number; seats: string[] }>);

  const uniqueSections = Object.keys(sectionTotals);

  return (
    <div
      className="p-4 rounded-lg shadow-md w-full"
      style={{
        background: 'radial-gradient(circle, #926060 0%, #843434 100%)',
        color: 'white',
      }}
    >
      <div className="flex">
        <div className="w-1/2">
          <div className="flex justify-between font-bold p-2 border-b border-black">
            <p className="w-1/2">Seat</p>
            <p className="w-1/2">Price</p>
          </div>

          <div>
            {tickets.map((ticket, index) => (
              <div
                key={`ticket-${index}`}
                className="flex justify-between p-2 last:border-b-0"
              >
                <p className="w-1/2 text-secondary opacity-50">{ticket.seat}</p>
                <p className="w-1/2 text-secondary opacity-50">
                  $ {ticket.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex justify-between font-bold p-2 border-b border-black">
            <p className="w-1/2">Section</p>
            <p className="w-1/2">Total</p>
          </div>

          <div>
            {uniqueSections.map((section, index) => (
              <div
                key={`section-${index}`}
                className="flex justify-between p-2 "
              >
                <p className="w-1/2 text-secondary opacity-50">{section}</p>
                <p className="w-1/2 text-secondary opacity-50">
                  ${sectionTotals[section].totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDateTicketsCard;
