import React, { useState } from 'react';
import Image from 'next/image';

interface RangeFilterProps {
  label: string;
  min: number;
  max: number;
  initialStart: number;
  initialEnd: number;
  unit?: string;
}

const RangeFilter: React.FC<RangeFilterProps> = ({
  label,
  min,
  max,
  initialStart,
  initialEnd,
  unit = '',
}) => {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), end - 1); // Prevent overlapping
    setStart(value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), start + 1); // Prevent overlapping
    setEnd(value);
  };
  return (
    <div
      className="p-4 rounded-lg"
      style={{
        background: 'radial-gradient(circle, #926060 0%, #843434 100%)',
        color: 'white',
      }}
    >
      <div className="text-center">
        <p className="text-secondary font-bold text-lg">{label}</p>
      </div>

      <div className="flex flex-col items-center w-full py-4">
        <div className="relative w-[40px] h-[40px]">
          <Image
            src={'/images/Prices.png'}
            alt="image"
            fill
            objectFit="cover"
          />
        </div>

        <div className="relative w-[200px] h-[3px]">
          <Image src={'/images/Line.png'} alt="image" fill objectFit="cover" />
        </div>
      </div>

      <div className="flex gap-2 items-center justify-between w-full">
        <input
          className="bg-primary rounded-md px-2 py-1 w-1/2 outline-none text-center font-semibold"
          type="number"
          min={min}
          max={end - 1}
          value={start}
          onChange={handleStartChange}
        />
        <input
          className="bg-primary rounded-md px-2 py-1  w-1/2 outline-none text-center font-semibold"
          type="number"
          min={start + 1}
          max={max}
          value={end}
          onChange={handleEndChange}
        />
      </div>
    </div>
  );
};

export default RangeFilter;
