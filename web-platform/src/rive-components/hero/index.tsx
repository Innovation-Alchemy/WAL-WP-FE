'use client';
import {
  useRive,
  Layout,
  Fit,
  decodeImage,
  ImageAsset,
  decodeFont,
} from '@rive-app/react-canvas';
import pictures from '../../utils/heroPics';

export const RiveHero = () => {
  const { RiveComponent } = useRive({
    src: '/rive/hero/hero.riv',
    artboard: 'Hero Main',
    stateMachines: 'Hero Main SM',
    layout: new Layout({
      fit: Fit.Layout,
    }),
    autoplay: true,
    // Asset loader callback
    assetLoader: (asset, bytes) => {
      // Load image assets based on their name
      if (asset.isImage) {
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

  return <RiveComponent style={{ width: '100vw', height: '100vh' }} />;
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
// Function to assign the correct image to the asset
const assignImageAsset = (asset: ImageAsset) => {
  const assetNameToImageMap: Record<string, keyof typeof pictures> = {
    'pic 1': 'image1',
    'pic 2': 'image2',
    'pic 3': 'image3',
    'pic 4': 'image4',
    'pic 5': 'image5',
    'pic 6': 'image6',
    'pic 7': 'image7',
    'Shadow': 'shadow',
  };

  const imageKey = assetNameToImageMap[asset.name];
  if (imageKey) {
    // Convert to string if necessary
    const imageUrl = pictures[imageKey];
    fetch(imageUrl)
      .then(async (res) => {
        const image = await decodeImage(
          new Uint8Array(await res.arrayBuffer()),
        );
        asset.setRenderImage(image);
        image.unref(); // Clean up references when not needed anymore
      })
      .catch((error) => console.error('Error loading image:', error));
  } else {
    console.warn(`No matching image found for asset name: ${asset.name}`);
  }
};

export default function App() {
  return (
    <div>
      <div className="RiveContainer">
        <RiveHero />
      </div>
    </div>
  );
}
