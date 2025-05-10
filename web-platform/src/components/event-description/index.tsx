import React from 'react';

interface EventDescriptionProps {
  description: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({ description }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-primary py-2">Description</p>
      <p className="text-secondary text-sm">{description}</p>
    </div>
  );
};

export default EventDescription;
