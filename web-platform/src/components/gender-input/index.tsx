import React from 'react';

interface GenderInputProps {
  selectedGender: string;
  onGenderChange: (value: string) => void;
}

const GenderInput: React.FC<GenderInputProps> = ({
  selectedGender,
  onGenderChange,
}) => {
  return (
    <div className="flex flex-wrap">
      {['Male', 'Female'].map((gender) => (
        <label
          key={gender}
          className="flex items-center space-x-1 cursor-pointer text-sm md:text-base mr-3 mb-1"
        >
          <div
            className={`w-4 h-4 rounded-full border-2 transition-all ${
              selectedGender === gender
                ? 'bg-hero border-secondary'
                : 'bg-transparent border-secondary'
            }`}
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={selectedGender === gender}
              onChange={(e) => onGenderChange(e.target.value)}
              className="appearance-none w-full h-full rounded-full cursor-pointer"
            />
          </div>
          <span className="text-secondary">{gender}</span>
        </label>
      ))}
    </div>
  );
};

export default GenderInput;
