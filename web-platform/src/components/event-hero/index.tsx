'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';

import { useState } from 'react';

interface EventHeroProps {
  title: string;
  categories: string[];
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;

  location: string;
  address: string;
  description: string;
  additionalInfo: string;
  backgroundImage: string;
}

const EventHero: React.FC<EventHeroProps> = ({
  title,
  categories,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
  location,
  address,
  description,
  additionalInfo,
  backgroundImage,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="relative h-screen md:h-[550px] text-secondary">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Event Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      <div className="relative z-10 px-6 lg:px-32 pt-48 lg:w-4/6">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <p className=" mb-6">
          {categories.map((category, index) => (
            <span key={index} className="text-sm font-bold">
              {category}
              {index < categories.length - 1 && ' / '}
            </span>
          ))}
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-sm mb-4">
          <div className="flex flex-col">
            <span className="font-bold">Date</span>
            <div className="flex items-center space-x-1">
              <p>{dateFrom}</p>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              <p>{dateTo}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Time</span>
            <div className="flex items-center space-x-1">
              <p>{timeFrom}</p>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              <p>{timeTo}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{location}</span> {address}
          </div>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-4">
          {description}
        </p>

        <p className="text-sm font-semibold text-gray-300">{additionalInfo}</p>

        <div className="">
          <button
            className="text-white bg-transparent py-2"
            onClick={toggleBookmark}
            aria-label="Toggle Bookmark"
          >
            <FontAwesomeIcon
              icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventHero;
