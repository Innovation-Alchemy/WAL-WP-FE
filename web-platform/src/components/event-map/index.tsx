import React from 'react';

const GoogleMap = () => {
  return (
    <div className="flex flex-col">
      <p className="text-primary font-bold py-2">Location</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26587.850822385593!2d35.498308599999995!3d33.8937919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f172bdddf6c7b%3A0xc4ed1b7ec7c06fa!2sForum%20de%20Beyrouth!5e0!3m2!1sen!2slb!4v1693141081716!5m2!1sen!2slb"
        width="100%"
        height="250"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-md"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
