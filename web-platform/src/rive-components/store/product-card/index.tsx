'use client';
import {
  useRive,
  Layout,
  Fit,
  decodeImage,
  ImageAsset,
  decodeFont,
  EventType,
  RiveEventType,
  StateMachineInput,
} from '@rive-app/react-canvas';

import pictures from '@/utils/productCardPics';
import { useEffect, useRef, useState } from 'react';

export const RiveProductCard = ({
  isActive,
  onActivate,
  onDeactivate,
}: {
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpenInput, setIsOpenInput] = useState<StateMachineInput | null>(
    null,
  );
  const cardRef = useRef<HTMLDivElement>(null);

  const { RiveComponent, rive } = useRive({
    src: '/rive/store/productCard.riv',
    artboard: 'Main',
    stateMachines: 'Main SM',
    layout: new Layout({
      fit: Fit.Contain,
    }),
    autoplay: true,
    assetLoader: (asset, bytes) => {
      if (asset.isImage && asset.name === 'Main Merch') {
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
    if (rive) {
      const input = rive
        .stateMachineInputs('Main SM')
        .find((input) => input.name === 'isOpen');
      setIsOpenInput(input || null);
    }
  }, [rive]);

  // Handle isActive changes (triggered by parent or other cards)
  useEffect(() => {
    if (isOpenInput) {
      isOpenInput.value = isActive;
    }
  }, [isActive, isOpenInput]);

  // Hover timeout logic
  useEffect(() => {
    if (isHovered) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else if (isActive) {
      timeoutRef.current = setTimeout(() => {
        if (isOpenInput) isOpenInput.value = false;
        onDeactivate(); // Call parent to update the state
      }, 7000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered, isActive, isOpenInput, onDeactivate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        isActive
      ) {
        onDeactivate();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, onDeactivate]);

  const handleClick = () => {
    if (!isActive) {
      onActivate();
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <RiveComponent style={{ height: '590px', width: '280px' }} />
    </div>
  );
};

const fontAsset = (asset: any) => {
  fetch('/rive/font/Inter-594377.ttf').then(async (res) => {
    const font = await decodeFont(new Uint8Array(await res.arrayBuffer()));
    asset.setFont(font);
    font.unref();
  });
};

const assignImageAsset = (asset: ImageAsset) => {
  fetch(pictures.image1)
    .then(async (res) => {
      const image = await decodeImage(new Uint8Array(await res.arrayBuffer()));
      asset.setRenderImage(image);
      image.unref();
    })
    .catch((error) => console.error('Error loading image:', error));
};
