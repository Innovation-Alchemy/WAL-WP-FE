'use client';
import { useRive, Layout, Fit, decodeFont, useStateMachineInput, EventType, RiveEventType } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import { useSection } from '../../utils/SectionContext';

export const RiveTicketing: React.FC = () => {
  const { sectionStates, setSectionStates } = useSection(); // Access and update sectionStates
  const { rive, RiveComponent } = useRive({
    src: '/rive/events/ticketing.riv',
    artboard: 'Popup window',
    stateMachines: 'Popup window SM',
    layout: new Layout({
      fit: Fit.Layout,
      layoutScaleFactor: 2.5,
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

  const section1 = useStateMachineInput(rive, 'Popup window SM', 'Section 1');
  const section2 = useStateMachineInput(rive, 'Popup window SM', 'Section 2');
  const section3 = useStateMachineInput(rive, 'Popup window SM', 'Section 3');
  useEffect(() => {
    if (rive) {
      if (section1) section1.value = sectionStates.section1;
      if (section2) section2.value = sectionStates.section2;
      if (section3) section3.value = sectionStates.section3;

      if (rive && sectionStates.seats) {
        sectionStates.seats.forEach((seat, index) => {
          if (index < 5) rive.setTextRunValue(`Seat ${index + 1}`, seat || '');
        });

        for (let i = sectionStates.seats.length; i < 5; i++) {
          rive.setTextRunValue(`Seat ${i + 1}`, ''); // Clear remaining seats
        }
      }
    }
  }, [sectionStates, rive]);

  const onRiveEventReceived = (riveEvent: any) => {
    const eventData = riveEvent.data;
  
    if (eventData.type === RiveEventType.General && eventData.name === 'S1 Plus') {
      setSectionStates((prev) => {
        const updatedValue = prev.s1Value + 1; // Increment
        if (rive) rive.setTextRunValue('seatCountRun1', updatedValue.toString());
        return {
          ...prev,
          s1Value: updatedValue, // Update s1Value in state
        };
      });
    }
  
    if (eventData.type === RiveEventType.General && eventData.name === 'S1 Minus') {
      setSectionStates((prev) => {
        const updatedValue = Math.max(0, prev.s1Value - 1); // Decrement but not below 0
        if (rive) rive.setTextRunValue('seatCountRun1', updatedValue.toString());
        return {
          ...prev,
          s1Value: updatedValue, // Update s1Value in state
        };
      });
    }
  
    if (eventData.type === RiveEventType.General && eventData.name === 'S2 Plus') {
      setSectionStates((prev) => {
        const updatedValue = prev.s2Value + 1; // Increment
        if (rive) rive.setTextRunValue('seatCountRun2', updatedValue.toString());
        return {
          ...prev,
          s2Value: updatedValue, // Update s2Value in state
        };
      });
    }
  
    if (eventData.type === RiveEventType.General && eventData.name === 'S2 Minus') {
      setSectionStates((prev) => {
        const updatedValue = Math.max(0, prev.s2Value - 1); // Decrement but not below 0
        if (rive) rive.setTextRunValue('seatCountRun2', updatedValue.toString());
        return {
          ...prev,
          s2Value: updatedValue, // Update s2Value in state
        };
      });
    }
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
    <div className="event-map-new" style={{ width: '380px', height: '360px' }}>
      <RiveComponent />
    </div>
  );
};