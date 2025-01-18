'use client';
import { useSearch } from '@/context/search-context';
import { EVENT_ROUTE, STORE_ROUTE } from '@/utils/navigation';
import {
  useRive,
  Layout,
  Fit,
  decodeFont,
  EventType,
  RiveEventType,
} from '@rive-app/react-canvas';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import "./navBar.css";

export const RiveNavBar = () => {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen } = useSearch();

  const { rive, RiveComponent } = useRive({
    src: '/rive/navBar/nav_bar.riv',
    artboard: 'Nav Bar',
    stateMachines: 'Nav Bar SM',
    layout: new Layout({
      fit: Fit.Layout,
    }),
    autoplay: true,
    // Callback handler to pass in that dictates what to do with an asset found in
    // the Rive file that's being loaded in
    assetLoader: (asset, bytes) => {
      // Here, we load a font asset on load of the Rive file
      // and return true, because this callback handler is responsible for loading
      // the asset, as opposed to the runtime
      if (asset.isFont) {
        fontAsset(asset);
        return true;
      } else {
        return false;
      }
    },
  });

  const onRiveEventReceived = (riveEvent: any) => {
    const eventData = riveEvent.data;
    // console.log('Event received:', eventData);
    if (
      eventData.type === RiveEventType.General &&
      eventData.name === 'Events'
    ) {
      router.push(EVENT_ROUTE);
    } else if (
      eventData.type === RiveEventType.General &&
      eventData.name === 'Store'
    ) {
      router.push(STORE_ROUTE);
    } else if (
      eventData.type === RiveEventType.General &&
      eventData.name === 'SearchOpen'
    ) {
      setIsSearchOpen(true);
    } else if (
      eventData.type === RiveEventType.General &&
      eventData.name === 'SearchStart'
    ) {
      setIsSearchOpen(false);
    }
  };

  // Wait until the rive object is instantiated before adding the Rive
  // event listener
  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, onRiveEventReceived);
    }
  }, [rive, onRiveEventReceived]);

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

  return (
    <div className="relative">
      <RiveComponent style={{ width: '100%', height: '80px' }} />

      {isSearchOpen && (
        <div className="AbsContainer z-50 h-full flex items-center border-white">
          <div className='InnerRel'>
            <input
              type="text"
              placeholder="Search for event"
              className="theInput w-80 bg-transparent px-4 py-2 text-secondary placeholder-gray-300 outline-none"
            />
          </div>
        </div>
        // null // AA TEST
      )}
    </div>
  );
};
