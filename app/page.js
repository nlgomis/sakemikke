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
        <main className="flex-1 flex flex-col justify-center pt-32 2xl:pt-40 items-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[90%] sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
            {/* Logo Container */}
            <div className="mb-6 sm:mb-8 2xl:mb-12">
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
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100/90 font-light tracking-wide sm:tracking-[.40em] mb-8 sm:mb-12 2xl:mb-16 px-4">
              {t.home.subtitle}
            </p>

            {/* Buttons Container */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-6 px-4">

              <Link href="/quiz" className="relative overflow-hidden rounded-lg py-8 md:py-8 px-6 sm:px-32 text-base sm:text-lg w-4/5 mx-auto sm:w-1/2">
    
                <span className="absolute inset-[3px] z-10 flex items-center justify-center rounded-lg bg-indigo-950 bg-gradient-to-t from-blue-950 text-white hover:bg-indigo-950/20  duration-300 hover:scale-[1.15] transition-all">
                  {t.home.startButton}
                </span>

                <span aria-hidden className="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-fuchsia-500 before:via-blue-600  before:to-cyan-400 " />

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