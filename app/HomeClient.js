"use client";

import Link from 'next/link';
import LanguageSwitcher from './components/LanguageSwitcher';

export default function HomeClient({ lang, translations: t }) {
  return (
    <div className="relative flex flex-col min-h-screen bg-black">
      <LanguageSwitcher />

      <main className="relative z-10 flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl w-full text-center">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-6 tracking-wider"
          >
            {t.title}
          </h1>
          
          <p 
            className="text-xl sm:text-2xl text-blue-100/90 font-light tracking-wide mb-12"
          >
            {t.subtitle}
          </p>

          <div 
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8"
          >
            <Link 
              href={`/${lang}/quiz`}
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg 
                        transition-all duration-300 border border-white/30"
            >
              <span className="text-lg font-light tracking-wide">{t.startButton}</span>
            </Link>
            <Link 
              href={`/${lang}/about`}
              className="inline-block px-8 py-4 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg 
                        transition-all duration-300 border border-blue-400/30"
            >
              <span className="text-lg font-light tracking-wide">{t.exploreButton}</span>
            </Link>
          </div>
        </div>
      </main>

      <footer 
        className="relative z-10 py-6 text-center text-blue-100/70"
      >
        <p className="text-sm font-light tracking-wider">{t.copyright}</p>
      </footer>
    </div>
  );
}