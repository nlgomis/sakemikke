// app/page.js
"use client";

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import GradientBackground from './components/GradientbBackground';
import Image from 'next/image';
export default function Home() {
  const { t } = useLanguage();
  // const vantaRef = useRef(null);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   const initVanta = async () => {
  //     const HALO = (await import('vanta/dist/vanta.halo.min')).default;
  //     const THREE = await import('three');
      
  //     const effect = HALO({
  //       el: vantaRef.current,
  //       THREE: THREE,
  //       mouseControls: true,
  //       touchControls: true,
  //       gyroControls: false,
  //       minHeight: 200.00,
  //       minWidth: 200.00,
  //       backgroundColor: 0x000000,
  //       baseColor: 0x1a59,
  //       amplitudeFactor: 1,
  //       xOffset: 0,
  //       yOffset: 0,
  //       size: 2,
  //       scaleMobile: 1.00
  //     });

  //     return () => {
  //       if (effect) effect.destroy();
  //     };
  //   };

  //   if (!mounted) {
  //     setMounted(true);
  //     initVanta();
  //   }
  // }, [mounted]);

  return (
    <div className="relative min-h-screen">
      <GradientBackground className="fixed inset-0 z-0" />
      
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center pt-24 items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[90%] sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
            {/* Logo Container */}
            <div className="mb-6 sm:mb-8">
              <Image 
                src="/images/logo.png" 
                alt="Logo" 
                width={300} 
                height={300} 
                className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain mx-auto"
                priority
              />
            </div>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100/90 font-light tracking-wide mb-8 sm:mb-12 px-4">
              {t.home.subtitle}
            </p>

            {/* Buttons Container */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-6 px-4">
              <Link 
                href="/quiz"
                className="inline-block px-8 sm:px-12 lg:px-24 py-3 bg-black/20 hover:bg-white/20 text-white
                          transition-all duration-300 border border-white text-base sm:text-lg
                          w-full sm:w-auto"
              >
                <span className="font-light tracking-wide">{t.home.startButton}</span>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 sm:py-6 text-center text-blue-100/70 mt-auto">
          <p className="text-xs sm:text-sm font-light tracking-wider px-4">
            {t.home.copyright}
          </p>
        </footer>
      </div>
    </div>
  );
}