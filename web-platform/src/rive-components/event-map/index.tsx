'use client';
import {
  useRive,
  Layout,
  Fit,
  decodeFont,
} from '@rive-app/react-canvas';

export const RiveTicketingMap = ({}) => {

  const { RiveComponent, rive } = useRive({
    src: '/rive/events/ticketing.riv',
    artboard: 'Stage',
    stateMachines: 'Stage SM',
    layout: new Layout({
      fit: Fit.Contain,
    }),
    autoplay: true,
    assetLoader: (asset, bytes) => {
     if (asset.isFont) {
        fontAsset(asset);
        return true;
      } else {
        return false;
      }
    },
  });

  return (
    <div className="event-map">
      <RiveComponent />
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


export default function App() {
  return (
    <div>
      <RiveTicketingMap />
    </div>
  );
}
