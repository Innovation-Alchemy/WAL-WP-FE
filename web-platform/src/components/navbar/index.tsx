'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  INDEX_ROUTE,
  EVENT_ROUTE,
  BLOGS_ROUTE,
  STORE_ROUTE,
  CONTACT_ROUTE,
  APP_ROUTE,
} from '@/utils/navigation';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Event', route: EVENT_ROUTE },
  { name: 'Blogs', route: BLOGS_ROUTE },
  { name: 'Store', route: STORE_ROUTE },
  { name: 'Contact', route: CONTACT_ROUTE },
  { name: 'App', route: APP_ROUTE },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-secondary px-6 py-4 relative z-50 md:block md:z-0">
      <div className="flex justify-between md:justify-start items-center md:space-x-6">
        <div className="relative w-10 h-10">
          <Link href={INDEX_ROUTE}>
            <Image
              src="/images/Logo.png"
              alt="Logo"
              objectFit="contain"
              fill
              priority
            />
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="text-secondary text-2xl transition-transform duration-300"
            />
          </button>
        </div>

        <ul className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.route}
                className={`hover:text-gray-400 ${
                  currentPath === link.route ? 'font-bold' : ''
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black bg-opacity-100 z-40 transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-500 ease-in-out flex flex-col space-y-8`}
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <div className="flex justify-between p-6">
              <div className="relative w-10 h-10">
                <Link href={INDEX_ROUTE}>
                  <Image
                    src="/images/Logo.png"
                    alt="Logo"
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </Link>
              </div>
              <button
                onClick={toggleMenu}
                className="text-secondary text-3xl focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <ul className="text-left space-y-6 px-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.route}
                    onClick={toggleMenu}
                    className={`hover:text-gray-400 text-xl ${
                      currentPath === link.route ? 'font-bold' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg z-30"
            onClick={toggleMenu}
          ></div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
