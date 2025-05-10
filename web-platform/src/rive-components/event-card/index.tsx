'use client';
import {
  useRive,
  Layout,
  Fit,
  decodeImage,
  ImageAsset,
  decodeFont,
  Alignment,
  FontAsset,
} from '@rive-app/react-canvas';

import pictures from '../../utils/eventPics';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
interface RiveEventCardProps {
  id: number;
  title: string;
  description: string;
  date_time: string;
  image: string;
}

export const RiveEventCard = ({ id, title, description, date_time, image }: RiveEventCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { RiveComponent, rive } = useRive({
    src: '/rive/events/card.riv',
    artboard: 'Card 2',
    stateMachines: 'Card SM',
    layout: new Layout({
      fit: Fit.Layout,
      alignment: Alignment.TopLeft,
    }),
    autoplay: true,

    // Callback handler to pass in that dictates what to do with an asset found in
    // the Rive file that's being loaded in
    assetLoader: (asset, bytes) => {
      // Here, we load a font asset with a random font on load of the Rive file
      // and return true, because this callback handler is responsible for loading
      // the asset, as opposed to the runtime
      if (asset.isImage && asset.name === 'Thumbnail') {
        assignImageAsset(asset as ImageAsset);
        return true;
      } else if (asset.isImage && asset.name === 'Shadow Thumbnail') {
        assignShadow(asset as ImageAsset);
        return true;
      } else if (asset.isFont) {
        fontAsset(asset);
        return true;
      } else {
        return false;
      }
    },
  });
  if(rive) rive.setTextRunValue('Title Run', title);
  if (rive) rive.setTextRunValue('Sub Title Run', description.length > 35 ? description.substring(0, 35) + '...' : description);
  const parsedDates = JSON.parse(date_time);
  const dateObjects = parsedDates.map((date: string) => new Date(date.split('T')[0]));
  const uniqueDays: number[] = Array.from(new Set(dateObjects.map((date: Date) => date.getDate())));

  const daysRunValue = uniqueDays.length > 1 
    ? `${uniqueDays[0]} -> ${uniqueDays[uniqueDays.length - 1]}` 
    : `${uniqueDays[0]}`;

  if(rive) rive.setTextRunValue('Days Run', daysRunValue);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const uniqueMonths: number[] = Array.from(new Set(dateObjects.map((date: Date) => date.getMonth())));
  const monthRunValue = uniqueMonths.length > 1 
    ? `${monthNames[uniqueMonths[0]].substring(0, 3)} - ${monthNames[uniqueMonths[uniqueMonths.length - 1]].substring(0, 3)}`
    : monthNames[uniqueMonths[0]];

  if(rive) rive.setTextRunValue('Month Run', monthRunValue);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const uniqueDayNames: string[] = Array.from(new Set(dateObjects.map((date: Date) => dayNames[date.getDay()])));
  const dayNameRunValue: string = uniqueDayNames.length > 1 
    ? `${uniqueDayNames[0]} -> ${uniqueDayNames[uniqueDayNames.length - 1]}` 
    : uniqueDayNames[0];
  if(rive) rive.setTextRunValue('DayName Run', dayNameRunValue);
  const timeStrings = date_time.match(/T(\d{2}:\d{2}:\d{2})/g)?.map(t => t.slice(1)) || [];
  const startTime = new Date(`1970-01-01T${timeStrings[0]}`);
  const endTime = timeStrings[1] ? new Date(`1970-01-01T${timeStrings[1]}`) : null;

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const timeRunValue = endTime 
    ? `${formatTime(startTime)} -> ${formatTime(endTime)}` 
    : formatTime(startTime);

  if (rive) rive.setTextRunValue('Time Run', timeRunValue);
  useEffect(() => {
    if (rive) {
      const isOpenInput = rive
        .stateMachineInputs('Card SM')
        .find((input) => input.name === 'isOpen');
      if (isOpenInput) {
        isOpenInput.value = isOpen; // Sync the state machine with the component state
      }
    }
  }, [isOpen, rive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the card when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCardClick = () => {
    if (isOpen) {
      // If the card is already open, redirect to the event page
      router.push('/event/' + id);
    } else {
      // Otherwise, open the card
      setIsOpen(true);
    }
  };

  const assignImageAsset = (asset: ImageAsset) => {
    fetch(image)
      .then(async (res) => {
        const imageBlob = await res.blob();
        const image = await decodeImage(
          new Uint8Array(await imageBlob.arrayBuffer()),
        );
        asset.setRenderImage(image);
        image.unref(); // Clean up references when not needed anymore
      })
      .catch((error) => console.error('Error loading or scaling image:', error));
  };

  return (
    <div
      ref={cardRef}
      className={`event-card relative ${isOpen ? 'open' : ''}`}
      onClick={handleCardClick}
    >
      <RiveComponent />
    </div>
  );
};
const fontAsset = (asset: any) => {
  fetch('/rive/font/Inter-594377.ttf').then(async (res) => {
    // decodeFont creates a Rive-specific Font object that `setFont()` takes
    // on the asset from assetLoader
    const font = await decodeFont(new Uint8Array(await res.arrayBuffer()));
    asset.setFont(font);

    // Be sure to call unref to release any references.
    // This allows the engine to clean it up when it is not used by any more animations.
    font.unref();
  });
};

const assignShadow = (asset: ImageAsset) => {
  fetch(pictures.shadow)
    .then(async (res) => {
      const image = await decodeImage(new Uint8Array(await res.arrayBuffer()));
      asset.setRenderImage(image);
      image.unref(); // Clean up references when not needed anymore
    })
    .catch((error) => console.error('Error loading shadow image:', error));
};
