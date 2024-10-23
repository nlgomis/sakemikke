// app/components/LanguageSwitcher.js
"use client";

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage, languages } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 
                   hover:bg-white/20 transition-all duration-300 border border-white/30"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-48 py-2 mt-2 bg-black/95 border 
                      border-white/30 rounded-lg shadow-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 
                         transition-all duration-300 flex items-center space-x-2"
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-light">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}