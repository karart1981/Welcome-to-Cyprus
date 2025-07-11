'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';

type NavbarData = {
  home: string;
  services: string;
  hotels: string;
  restaurants: string;
  tours: string;
  others: string;
  blog: string;
  contact: string;
  about: string;
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [translations, setTranslations] = useState<NavbarData | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const lang = (searchParams.get('lang') as 'en' | 'gr' | 'ru') || 'en';

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const res = await fetch('/data/data.json');
        const data = await res.json();
        setTranslations(data[lang] || data['en']);
      } catch (error) {
        console.error('Failed to load navbar translations:', error);
      }
    };

    fetchTranslations();
  }, [lang]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const buildHref = (path: string) => `${path}?lang=${lang}`;

  if (!translations) return null;

  return (
    <>
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-2 relative z-20 bg-white shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold text-teal-700">
          <Image src="/logo2.png" width={80} height={80} alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 text-black font-medium relative">
          <Link href={buildHref('/')}>{translations.home}</Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopDropdownOpen(true)}
            onMouseLeave={() => setDesktopDropdownOpen(false)}
          >
            <span className="cursor-pointer hover:text-teal-400">
              {translations.services}
            </span>
            <div
              className={`absolute left-0 mt-0 w-52 bg-[var(--mid-teal)] text-white py-3 px-4 rounded shadow-xl transition-all duration-200 ease-in-out z-30 flex flex-col space-y-2 ${
                desktopDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
              }`}
            >
              <Link href={buildHref('/hotels')}>{translations.hotels}</Link>
              <Link href={buildHref('/restaurants')}>{translations.restaurants}</Link>
              <Link href={buildHref('/tours')}>{translations.tours}</Link>
              <Link href={buildHref('/others')}>{translations.others}</Link>
            </div>
          </div>

          <Link href={buildHref('/blog')}>{translations.blog}</Link>
          <Link href={buildHref('/contact')}>{translations.contact}</Link>
          <Link href={buildHref('/about')}>{translations.about}</Link>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 hover:text-teal-500 transition"
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            >
              <FiGlobe size={20} />
            </button>
            <div
              className={`absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg transition-all z-30 w-36 ${
                languageDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
              }`}
            >
              <div className="flex flex-col p-2">
                {['en', 'gr', 'ru'].map((code) => (
                  <Link
                    key={code}
                    href={`${pathname}?lang=${code}`}
                    onClick={() => setLanguageDropdownOpen(false)} // Close dropdown after click
                    className={`flex items-center px-2 py-1 rounded-md text-sm transition ${
                      lang === code
                        ? 'bg-teal-100 font-semibold text-teal-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Image
                      src={`/flags/${code}.svg`}
                      alt={code}
                      width={20}
                      height={14}
                      className="mr-2 rounded-sm border border-gray-300"
                    />
                    {code === 'en' ? 'English' : code === 'gr' ? 'Greek' : 'Russian'}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 text-teal-800 text-xl lg:hidden">
          <FaUserCircle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-teal-800 text-white flex flex-col items-center space-y-4 py-6 z-10">
          <Link href={buildHref('/')} onClick={handleLinkClick}>
            {translations.home}
          </Link>

          {/* Mobile Services */}
          <div className="w-full text-center">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full py-2 hover:text-teal-300"
            >
              {translations.services}
            </button>
            {mobileServicesOpen && (
              <div className="mt-2 flex flex-col space-y-2 text-sm">
                <Link href={buildHref('/hotels')} onClick={handleLinkClick}>
                  {translations.hotels}
                </Link>
                <Link href={buildHref('/restaurants')} onClick={handleLinkClick}>
                  {translations.restaurants}
                </Link>
                <Link href={buildHref('/tours')} onClick={handleLinkClick}>
                  {translations.tours}
                </Link>
                <Link href={buildHref('/others')} onClick={handleLinkClick}>
                  {translations.others}
                </Link>
              </div>
            )}
          </div>

          <Link href={buildHref('/blog')} onClick={handleLinkClick}>
            {translations.blog}
          </Link>
          <Link href={buildHref('/contact')} onClick={handleLinkClick}>
            {translations.contact}
          </Link>
          <Link href={buildHref('/about')} onClick={handleLinkClick}>
            {translations.about}
          </Link>

          {/* Mobile Language Switcher */}
          <div className="flex space-x-3 mt-4 items-center">
            {['en', 'gr', 'ru'].map((code) => (
              <Link
                key={code}
                href={`${pathname}?lang=${code}`}
                className={`rounded-sm border transition p-[2px] ${
                  lang === code
                    ? 'border-white bg-white shadow-sm'
                    : 'border-transparent hover:opacity-75'
                }`}
              >
                <Image
                  src={`/flags/${code}.svg`}
                  alt={code}
                  width={24}
                  height={16}
                  title={code === 'en' ? 'English' : code === 'gr' ? 'Greek' : 'Russian'}
                  className="rounded-sm"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


