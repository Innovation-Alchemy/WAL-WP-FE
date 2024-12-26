'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';

import { useState } from 'react';

interface EventHeroProps {
  title: string;
  subtitle: string;
  address: string;
  backgroundImage: string;
}

const EventHero: React.FC<EventHeroProps> = ({
  title,
  subtitle,
  address,
  backgroundImage,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="relative h-[550px] md:h-[500px] text-secondary">
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

      <div className="relative z-10 px-6 md:px-24 justify-center flex flex-col top-80 min-h-fit">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <h2 className="text-xl">{subtitle}</h2>

        <div className="py-2">
          <p>{address}</p>
        </div>

        <div className="flex items-center space-x-2 py-3">
          <p className="font-bold">Bookmark for later</p>
          <button
            className="text-secondary"
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
