'use client';
import { useRive, Layout, Fit, decodeFont } from '@rive-app/react-canvas';

export const RiveNavBar = ({}) => {
  const { RiveComponent } = useRive({
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

  return <RiveComponent style={{ width: '100%', height: '80px' }} />;
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

export default function App() {
  return (
    <div>
      <div className="RiveContainer">
        <RiveNavBar />
      </div>
    </div>
  );
}
