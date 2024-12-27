import React from 'react';

interface BirthdateInputProps {
  date: string;
  onDateChange: (date: string) => void;
}

const BirthdateInput: React.FC<BirthdateInputProps> = ({
  date,
  onDateChange,
}) => {
  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className={`w-full py-2 px-3 bg-primary rounded-lg text-center ${
          date ? 'text-secondary' : 'text-black'
        }`}
      />
    </div>
  );
};

export default BirthdateInput;
