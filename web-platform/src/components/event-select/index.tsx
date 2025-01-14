import React from 'react';

interface EventSelectProps {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const EventSelect: React.FC<EventSelectProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <select
      className="px-4 py-2 bg-secondary text-primary rounded-lg focus:outline-none font-bold"
      value={selectedOption}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default EventSelect;
