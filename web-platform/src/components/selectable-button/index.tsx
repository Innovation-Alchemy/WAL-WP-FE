'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

interface SelectableButtonProps {
  isSelected: boolean;
  label: string;
  onClick: () => void;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  isSelected,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-2 py-1 md:px-4 md:py-2 text-sm font-bold rounded-md transition-all ${
        isSelected ? 'bg-secondary text-hero' : 'bg-primary text-secondary'
      }`}
    >
      <FontAwesomeIcon icon={isSelected ? faCheck : faPlus} />
      <span>{label}</span>
    </button>
  );
};

export default SelectableButton;
