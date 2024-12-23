'use client';
import {
  useRive,
  Layout,
  Fit,
  decodeImage,
  ImageAsset,
  decodeFont,
} from '@rive-app/react-canvas';
import ReactDOM from 'react-dom';

import pictures from '../../utils/eventPics';
import { useEffect, useRef, useState } from 'react';

export const RiveEventCard = ({}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { RiveComponent, rive } = useRive({
    src: '/rive/events/card.riv',
    artboard: 'Card',
    stateMachines: 'Card SM',
    layout: new Layout({
      fit: Fit.Layout,
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
      } else if (asset.isFont) {
        fontAsset(asset);
        return true;
      } else {
        return false;
      }
    },
  });

  useEffect(() => {
    if (containerRef.current && rive) {
      rive.resizeDrawingSurfaceToCanvas();
    }
  }, [rive]);

  return (
    <div ref={containerRef} className="event-card">
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

const assignImageAsset = (asset: ImageAsset) => {
  fetch(pictures.image1)
    .then(async (res) => {
      const image = await decodeImage(new Uint8Array(await res.arrayBuffer()));
      asset.setRenderImage(image);
      image.unref(); // Clean up references when not needed anymore
    })
    .catch((error) => console.error('Error loading image:', error));
};

export default function App() {
  return (
    <div>
      <RiveEventCard />
    </div>
  );
}
