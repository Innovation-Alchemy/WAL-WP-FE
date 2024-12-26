'use client';
import { useRive, Layout, Fit, decodeFont, EventType, RiveEventType } from '@rive-app/react-canvas';
import {  useEffect } from 'react';

export const RiveNavBar = ({}) => {
  const {rive, RiveComponent } = useRive({
    src: '/rive/hero/hero.riv',
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

const onRiveEventReceived = (riveEvent : any) => {
  const eventData = riveEvent.data;
  console.log(eventData);
  const eventProperties = eventData.properties;
  if (eventData.type === RiveEventType.General && eventData.name === "Events") {
    // window.location.href = "/events";
  } else if (eventData.type === RiveEventType.General && eventData.name === "Store") {
    window.location.href = "/store";
  }
};

// Wait until the rive object is instantiated before adding the Rive
// event listener
useEffect(() => {
  if (rive) {
    rive.on(EventType.RiveEvent, onRiveEventReceived);
  }
}, [rive]);

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

return <RiveComponent style={{ width: '100%', height: '80px' }} />;

};
export default function App() {
  return (
    <div>
      <div className="RiveContainer">
        <RiveNavBar />
      </div>
    </div>
  );
}
