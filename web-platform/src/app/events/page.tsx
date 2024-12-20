import React from "react";
import { RiveHero } from "../../riveComponents/hero/heroSection"; 
import { RiveEventCard } from "../../riveComponents/events/eventCard"; 
import { RiveNavBar } from "../../riveComponents/navBar/navBar";

const EventsPage = () => {
  return (
    <div className="h-screen">
      <div className="mt-8 flex justify-center"  style={{ width: '100vw', height: '100vh' }}>
        <RiveHero />
      </div>
      {/* <div className="mt-8 flex justify-center"  style={{ width: '100vw', height: '100vh' }}>
        <RiveEventCard />
      </div> */}
      {/* <div className="mt-8 flex justify-center"  style={{ width: '100vw', height: '100vh' }}>
        <RiveNavBar />
      </div> */}
    </div>
     

  );
};

export default EventsPage;