'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Slider from '../slider/Slider'; // adjust if path differs

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/header-bg.png')` }}
    >
      {/* Navbar */}
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 relative z-20">
        <div className="text-2xl sm:text-3xl font-bold text-teal-700 flex items-center">
          <Image src="/logo.png" width={80} height={80} alt="Logo" className="w-[80px] h-[80px]" />
        </div>

        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link href="#" className="hover:text-teal-300">Home</Link>
          <Link href="#" className="hover:text-teal-300">Activities</Link>
          <Link href="#" className="hover:text-teal-300">Packages</Link>
          <Link href="#" className="hover:text-teal-300">Contact Us</Link>
          <Link href="#" className="hover:text-teal-300">About Us</Link>
        </div>

        <div className="flex items-center space-x-4 text-white text-xl">
          <FaUserCircle className="cursor-pointer" />
          <div className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-teal-800 text-white flex flex-col items-center space-y-4 py-6 z-10">
          <Link href="#" className="hover:text-teal-300">Home</Link>
          <Link href="#" className="hover:text-teal-300">Hotels</Link>
          <Link href="#" className="hover:text-teal-300">Restaurants</Link>
          <Link href="#" className="hover:text-teal-300">Tour Agencies</Link>
          <Link href="#" className="hover:text-teal-300">Other Services</Link>
          <Link href="#" className="hover:text-teal-300">Blog</Link>
          <Link href="#" className="hover:text-teal-300">Contact Us</Link>
          <Link href="#" className="hover:text-teal-300">About Us</Link>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-12 gap-8">
        <div className="text-white max-w-xl text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Dream <span className="text-teal-400">|</span> Explore <span className="text-teal-400">|</span> Discover
          </h1>
          <p className="text-base sm:text-lg mb-6">
            Get the best prices on all excursions and activities across World.
          </p>
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-full font-semibold">
            Explore Now
          </button>
        </div>

        {/* Image Slider Component */}
        <Slider />
      </div>
    </div>
  );
}






