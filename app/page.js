// app/page.js
"use client";

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function Home() {
  const { t } = useLanguage();
  const vantaRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initVanta = async () => {
      const HALO = (await import('vanta/dist/vanta.halo.min')).default;
      const THREE = await import('three');
      
      const effect = HALO({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        backgroundColor: 0x000000,
        baseColor: 0x1a59,
        amplitudeFactor: 1,
        xOffset: 0,
        yOffset: 0,
        size: 2,
        scaleMobile: 1.00
      });

      return () => {
        if (effect) effect.destroy();
      };
    };

    if (!mounted) {
      setMounted(true);
      initVanta();
    }
  }, [mounted]);

  return (
    <div className="relative flex flex-col min-h-screen bg-black">
      <LanguageSwitcher />
      
      <div 
        ref={vantaRef} 
        className="fixed top-0 left-0 w-full h-full z-0 bg-black"
      />

      <main className="relative z-10 flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-6 tracking-wider">
            {t.home.title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-100/90 font-light tracking-wide mb-12">
            {t.home.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
            <Link 
              href="/quiz"
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg 
                        transition-all duration-300 border border-white/30"
            >
              <span className="text-lg font-light tracking-wide">{t.home.startButton}</span>
            </Link>
            <Link 
              href="/about"
              className="inline-block px-8 py-4 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg 
                        transition-all duration-300 border border-blue-400/30"
            >
              <span className="text-lg font-light tracking-wide">{t.home.exploreButton}</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-blue-100/70">
        <p className="text-sm font-light tracking-wider">{t.home.copyright}</p>
      </footer>
    </div>
  );
}