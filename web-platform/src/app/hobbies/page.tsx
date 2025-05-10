'use client';
import React, { useState } from 'react';
import Button from '@/components/button';
import RepeatedLogo from '@/components/repeated-logo';
import SelectableButton from '@/components/selectable-button';
import { useRouter } from 'next/navigation';
import { EVENT_ROUTE } from '@/utils/navigation';
import axios from 'axios';
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
  const router = useRouter();
  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((item) => item !== hobby)
        : [...prev, hobby],
    );
  };
  const hobbiesToSend = [1,2,3,4,5];
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || sessionStorage.getItem('userId') : null;
  async function sendHobbies() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') || sessionStorage.getItem('token') : null;
    console.log(userId);
    try {
      await axios.post(
      'https://wal-wp-be.onrender.com/api/hobbies/assign/' + userId,
      {
        hobbyIds: hobbiesToSend,
      },
      {
        headers: {
        Authorization: `Bearer ${token}`,
        },
      }
      );
      router.push(EVENT_ROUTE);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col lg:flex-row bg-black text-secondary">
      <RepeatedLogo />

      <div className="w-full lg:w-1/2 h-screen  flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
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

        <Button text="Continue" fullWidth onClick={() => sendHobbies()} />
      </div>
    </div>
  );
};

export default HobbiesPage;
