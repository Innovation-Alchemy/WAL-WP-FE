'use client';
import { useRive, Layout, Fit, decodeFont, EventType, RiveEventType } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import { useSection } from '../../utils/SectionContext';

export const RiveTicketingMap: React.FC = () => {
  const { setSectionStates } = useSection(); // Access the state updater from context

  const { rive, RiveComponent } = useRive({
    src: '/rive/events/ticketing.riv',
    artboard: 'Stage 2',
    stateMachines: ['Stage 2 SM'],
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

  const onRiveEventReceived = (riveEvent: any) => {
    const eventData = riveEvent.data;
    // console.log('Event received:', eventData);

    setSectionStates((prevState) => {
      const updatedStates = { ...prevState };

      if (
        eventData.type === RiveEventType.General &&
        eventData.name === 'Section 1 Pressed'
      ) {
        updatedStates.section1 = !prevState.section1;
      }

      if (
        eventData.type === RiveEventType.General &&
        eventData.name === 'Section 2 Pressed'
      ) {
        updatedStates.section2 = !prevState.section2;
      }

      if (
        eventData.type === RiveEventType.General &&
        eventData.name === 'Section 3 Pressed'
      ) {
        updatedStates.section3 = true;
      }
      if (
        eventData.type === RiveEventType.General &&
        eventData.name === 'Close Section 3' &&
        updatedStates.seats.length == 0
      ) {
        updatedStates.section3 = false;
      }
      if (eventData.name.includes('Seat')) {
        const seatNumber = eventData.name.split(' ').pop();
        if (seatNumber) {
          let updatedSeats = [...prevState.seats];
          if (updatedSeats.includes(seatNumber)) {
            updatedSeats = updatedSeats.filter(seat => seat !== seatNumber);
          } else {
            updatedSeats.push(seatNumber);
          }
          updatedStates.seats = updatedSeats;
        }
      }
      // console.log('Updated states:', updatedStates.seats);
      return updatedStates;
    });
  };

  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, onRiveEventReceived);
    }
  }, [rive]);
  const fontAsset = (asset: any) => {
    fetch('/rive/font/Inter-594377.ttf').then(async (res) => {
      const font = await decodeFont(new Uint8Array(await res.arrayBuffer()));
      asset.setFont(font);
      font.unref();
    });
  };
  return (
    <div className="event-map">
      <RiveComponent />
    </div>
  );
};