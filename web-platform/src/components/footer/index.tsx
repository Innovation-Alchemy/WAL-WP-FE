import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  TWITTER_LINK,
} from '@/utils/social-links';

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary py-8">
      <div className="container mx-auto px-48 justify-between hidden lg:flex">
        <div>
          <div className="flex items-center mb-4">
            <div className="relative w-[30px] h-[30px]">
              <Image
                src="/images/footer-logo.png"
                alt="Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="ml-2">
              <h2 className="text-xl font-bold">We Are Lebanon</h2>
            </div>
          </div>
          <p>Beirut, Lebanon</p>
          <p>Hamra Street,</p>
          <p>Starco Building</p>
          <p className="mt-4 text-sm">
            © 2024 we are lebanon all rights reserved
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Information</h3>
          <ul>
            <li>
              <Link href="#" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul>
            <li>
              <Link href="#" className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Get Started
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul>
            <li>
              <Link href="#" className="hover:underline">
                Contact Number
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Email Address
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Addresses & Hours
              </Link>
            </li>
          </ul>

          <div className="flex space-x-4 mt-4">
            <Link
              href={FACEBOOK_LINK}
              className="flex items-center justify-center w-5 h-5 "
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="lg"
                className="text-secondary"
              />
            </Link>
            <Link
              href={TWITTER_LINK}
              className="flex items-center justify-center w-5 h-5 "
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faXTwitter}
                size="lg"
                className="text-secondary"
              />
            </Link>
            <Link
              href={'#'}
              className="flex items-center justify-center w-5 h-5 "
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="lg"
                className="text-secondary"
              />
            </Link>
            <Link
              href={INSTAGRAM_LINK}
              className="flex items-center justify-center w-5 h-5 "
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="lg"
                className="text-secondary"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex flex-col justify-center items-center">
        <div className=" flex justify-center items-center space-x-4">
          <Link
            href={FACEBOOK_LINK}
            className="flex items-center justify-center w-5 h-5 "
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              className="text-secondary"
            />
          </Link>
          <Link
            href={TWITTER_LINK}
            className="flex items-center justify-center w-5 h-5 "
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              size="lg"
              className="text-secondary"
            />
          </Link>
          <Link
            href={'#'}
            className="flex items-center justify-center w-5 h-5 "
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="lg"
              className="text-secondary"
            />
          </Link>
          <Link
            href={INSTAGRAM_LINK}
            className="flex items-center justify-center w-5 h-5 "
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="text-secondary"
            />
          </Link>
        </div>

        <p className="text-sm p-4">© 2024 we are lebanon all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
