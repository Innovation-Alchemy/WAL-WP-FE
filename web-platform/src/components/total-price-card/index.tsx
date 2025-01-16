import React from 'react';

interface TotalPriceCardProps {
  totalPrice: string;
}

const TotalPriceCard: React.FC<TotalPriceCardProps> = ({ totalPrice }) => {
  return (
    <div
      className="p-2 rounded-lg shadow-md w-full"
      style={{
        background: 'radial-gradient(circle, #926060 0%, #843434 100%)',
        color: 'white',
        border: 'none',
      }}
    >
      <p className="font-bold text-lg border-b-2 border-black py-2">
        Total Price
      </p>
      <p className="py-2">{totalPrice}</p>

      <button className="bg-red-300 rounded-md w-full p-2 text-hero font-bold">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default TotalPriceCard;
