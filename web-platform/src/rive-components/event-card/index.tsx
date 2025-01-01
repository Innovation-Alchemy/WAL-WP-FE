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
export const RiveEventCard = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { RiveComponent, rive } = useRive({
    src: '/rive/events/card.riv',
    artboard: 'Card',
    stateMachines: 'Card SM',
    layout: new Layout({
      fit: Fit.Contain,
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
      }else if (asset.isImage && asset.name === 'Shadow Thumbnail') {
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
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="event-card relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => router.push('/event/1')}
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
// Load asset by using decodeImage API to feed to a
// setRenderImage API on the asset provided in assetLoader

// const assignImageAsset = (asset: ImageAsset) => {
//   fetch(pictures.image1)
//     .then(async (res) => {
//       const image = await decodeImage(new Uint8Array(await res.arrayBuffer()));
//       asset.setRenderImage(image);
//       image.unref(); // Clean up references when not needed anymore
//     })
//     .catch((error) => console.error('Error loading image:', error));
// };
const assignShadow = (asset: ImageAsset) => {
  fetch(pictures.shadow)
    .then(async (res) => {
      const image = await decodeImage(new Uint8Array(await res.arrayBuffer()));
      asset.setRenderImage(image);
      image.unref(); // Clean up references when not needed anymore
    })
    .catch((error) => console.error('Error loading shadow image:', error));
};
let lastSelectedKey: string | null = null; // Keeps track of the last selected picture

const assignImageAsset = (asset: ImageAsset) => {
  const pictureKeys = Object.keys(pictures);

  // Filter out the last selected key
  const filteredKeys = pictureKeys.filter((key) => key !== lastSelectedKey);

  // Select a random key from the remaining keys
  const randomKey = filteredKeys[Math.floor(Math.random() * (filteredKeys.length - 1)) + 1];
  const randomImageUrl = pictures[randomKey as keyof typeof pictures];

  // Update the last selected key
  lastSelectedKey = randomKey;

  fetch(randomImageUrl)
    .then(async (res) => {
      const imageBlob = await res.blob();
      const image = await decodeImage(new Uint8Array(await imageBlob.arrayBuffer()));
      asset.setRenderImage(image);
      image.unref(); // Clean up references when not needed anymore
    })
    .catch((error) => console.error('Error loading or scaling image:', error));
};

export default function App() {
  return <RiveEventCard />;
}
