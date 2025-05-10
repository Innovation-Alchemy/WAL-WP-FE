import { faArrowRight, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

interface EventCardProps {
  location: string;
  address: string;
  date: string;
  day: string;
  startTime: string;
  endTime?: string;
  duration?: string;
  image: string;
}

const EventCard: React.FC<EventCardProps> = ({
  location,
  address,
  date,
  day,
  startTime,
  endTime,
  duration,
  image,
}) => {
  return (
    <div
      className="p-2 rounded-lg shadow-lg w-full"
      style={{
        background: 'radial-gradient(circle, #926060 0%, #843434 100%)',
        color: 'white',
        border: 'none',
      }}
    >
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt="event image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute top-40 right-2">
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-white opacity-80 hover:opacity-100 cursor-pointer"
            size="lg"
          />
        </div>
      </div>

      <div className="py-4">
        <p className="text-secondary font-bold">{location}</p>
        <p className="text-sm text-secondary opacity-50">{address}</p>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-secondary font-bold">Date</p>
          <p className="text-sm text-secondary opacity-50">{date}</p>
        </div>
        <div>
          <p className="text-sm text-secondary font-bold">{day}</p>
          <p className="text-sm text-secondary opacity-50">
            {startTime}

            {endTime && (
              <>
                <FontAwesomeIcon icon={faArrowRight} className="mx-1" />
                {endTime}
              </>
            )}
          </p>
        </div>

        {duration && (
          <div>
            <p className="text-sm text-secondary font-bold">Duration</p>
            <p className="text-sm text-secondary opacity-50">{duration}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
