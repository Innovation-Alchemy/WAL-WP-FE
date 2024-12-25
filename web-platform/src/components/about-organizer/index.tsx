import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AboutOrganizer = () => {
  return (
    <div className="px-12 md:px-20 lg:px-60 mb-12">
      <p className="text-secondary text-sm py-2">About Organizer</p>
      <div className="flex space-x-2">
        <div className="text-primary flex items-center justify-center relative w-[20px] h-[20px]">
          <Image
            src="/images/Logo.png"
            alt="Organizer Logo"
            className="rounded-full"
            objectFit="cover"
            fill
          />
        </div>
        <p className="text-sm font-semibold">We Are Lebanon</p>
      </div>

      <p className="text-sm py-4">
        Crafting unforgettable moments, We are Lebanon is a leading event
        planning powerhouse known for transforming visions into reality. From
        large-scale corporate galas to vibrant festivals and exclusive private
        gatherings, we specialize in seamless execution, innovative design, and
        unparalleled attention to detail. With a global network of partners and
        a passion for storytelling through events, we ensure every occasion
        leaves a lasting impression. Whether it's orchestrating logistics,
        curating bespoke experiences, or designing immersive spaces, We are
        Lebanon turns every event into a masterpiece.
      </p>

      <div className="flex space-x-4">
        <Link href="https://facebook.com" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
        </Link>
        <Link href="https://instagram.com" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
        </Link>
        <Link href="https://wa.me" aria-label="WhatsApp">
          <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
        </Link>
        <Link href="mailto:info@wearelebanon.com" aria-label="Email">
          <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default AboutOrganizer;
