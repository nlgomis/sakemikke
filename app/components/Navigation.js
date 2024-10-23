// app/components/Navigation.js
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: t.navigation.quiz, path: '/quiz' },
    { name: t.navigation.types, path: '/sake-types' },
    { name: t.navigation.about, path: '/about' },
    { name: t.navigation.contact, path: '/contact' }
  ];


    return (
        <nav className="fixed top-0 left-0 w-full z-50">
        {/* Background with blur and gradient - only on desktop */}
        <div className="absolute inset-0 md:bg-black/30 md:backdrop-blur-sm" />
        
        {/* Navigation content */}
        <div className="relative h-20 px-6 flex items-center justify-between">
          {/* Left side - Back button */}
          <div className="flex items-center h-20">
    {pathname !== '/' && (
      <button
        onClick={() => {
          if (pathname.startsWith('/quiz/')) {
            router.push('/quiz');
          } else {
            router.push('/');
          }
        }}
        className="flex items-center group"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 
                      hover:bg-white/20 transition-all duration-300 border border-white/30">
          <svg 
            className="w-5 h-5 text-white transform group-hover:-translate-x-0.5 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </button>
    )}
  </div>
  
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center justify-between w-[600px]">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative py-2 group ${
                    pathname === item.path ? 'text-white' : 'text-white/70'
                  }`}
                >
                  <span className="text-base font-light tracking-wider group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent 
                                opacity-0 transform scale-x-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300
                                origin-center"></div>
                  {pathname === item.path && (
                    <div className="absolute -bottom-0 left-0 w-full h-px bg-white/50"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
  
          {/* Right side controls */}
          <div className="flex items-center justify-end space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full
                        bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`
            md:hidden absolute w-full bg-black/30 backdrop-blur-sm
            transition-all duration-300 ease-in-out border-t border-white/10
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden'}
          `}
        >
          <div className="py-4 px-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  block py-3 px-4 rounded-lg 
                  ${pathname === item.path 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }
                  transition-all duration-300 text-base font-light tracking-wider
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
  
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </nav>
    );
  }



  