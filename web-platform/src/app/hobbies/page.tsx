'use client';
import React, { useState } from 'react';
import Button from '@/components/button';
import RepeatedLogo from '@/components/repeated-logo';
import SelectableButton from '@/components/selectable-button';

const HOBBIES = [
  'Music',
  'Skiing',
  'Football',
  'Basketball',
  'Baseball',
  'Watching Movies',
  'Reading',
  'Technology',
  'Arts',
  'Fashion',
  'Video Games',
  'Legos',
  'Fitness',
  'Photography',
  'Jogging',
  'Bird Watching',
  'Cooking',
  'Travel',
  'Partying',
];

const HobbiesPage = () => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((item) => item !== hobby)
        : [...prev, hobby],
    );
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black text-secondary">
      <RepeatedLogo />

      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
          Let’s find out your taste, what you’re into, what a perfect weekend
          sounds like
        </h1>

        <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
          {HOBBIES.map((hobby) => (
            <SelectableButton
              key={hobby}
              label={hobby}
              isSelected={selectedHobbies.includes(hobby)}
              onClick={() => toggleHobby(hobby)}
            />
          ))}
        </div>

        <Button text="Continue" fullWidth />
      </div>
    </div>
  );
};

export default HobbiesPage;
