import React from 'react';

interface EventHoursProps {
  hours: string[];
}

const EventHours: React.FC<EventHoursProps> = ({ hours }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-primary py-2">Hours</p>
      <div>
        {hours.map((hour, index) => (
          <p key={index} className="text-sm ">
            {hour}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EventHours;
