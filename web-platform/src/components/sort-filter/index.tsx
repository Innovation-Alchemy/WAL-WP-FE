'use client';

import React from 'react';

interface SortFilterProps {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div
      className="flex items-center justify-between mb-8 w-1/5 rounded-lg px-4 py-1"
      style={{
        background: 'radial-gradient(circle, #926060 0%, #843434 100%)',
        color: 'white',
        border: 'none',
      }}
    >
      <label className="text-secondary py-1 font-bold w-1/2">Sort By:</label>
      <select
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        className="focus:outline-none bg-transparent font-bold w-1/2"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
