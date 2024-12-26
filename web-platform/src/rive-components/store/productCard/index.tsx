'use client';
import {
  useRive,
  Layout,
  Fit,
  decodeImage,
  ImageAsset,
  decodeFont,
} from '@rive-app/react-canvas';

import pictures from '../../../utils/productCardPics';

export const RiveProductCard = ({}) => {
  const { RiveComponent } = useRive({
    src: '/rive/store/productCard.riv',
    artboard: 'Main',
    stateMachines: 'Main SM',
    layout: new Layout({
      fit: Fit.Layout,
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

  return <RiveComponent className="product-card" />;
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

export default function App() {
  return <RiveProductCard />;
}
