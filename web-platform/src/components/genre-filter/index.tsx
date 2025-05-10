'use client';
import React, { useState } from 'react';
import SelectableButton from '../selectable-button';

const Genres = [
  'Concerts',
  'Stand Up',
  'Festival',
  'Racing',
  'Sports',
  'Theatre',
  'Comedy',
  'Travel',
  'Other',
];

const GenreFilter = () => {
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenre((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre)
        : [...prev, genre],
    );
  };
  return (
    <div
      className="p-2 rounded-lg"
      style={{
        background: 'radial-gradient(circle, #926060 0%, #843434 100%)',
        color: 'white',
        border: 'none',
      }}
    >
      <div className="w-full text-center pb-4">
        <p className="p-2 text-secondary font-bold text-lg">Genre</p>
      </div>

      <div className="w-full flex flex-wrap gap-2">
        {Genres.map((genre) => (
          <SelectableButton
            key={genre}
            label={genre}
            isSelected={selectedGenre.includes(genre)}
            onClick={() => toggleGenre(genre)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
