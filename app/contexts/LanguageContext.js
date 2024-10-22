// app/contexts/LanguageContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    home: {
      title: 'SAKEMIKKE',
      subtitle: 'Discover Your Perfect Sake Journey',
      startButton: 'Start Your Journey',
      exploreButton: 'Explore Sake',
      copyright: '© 2024 SAKEMIKKE. All rights reserved.'
    },
    quiz: {
      title: 'Choose Your Path',
      subtitle: 'Select a quiz type to find your perfect sake',
      back: 'Back',
      startQuiz: 'Start Quiz',
      options: {
        mood: {
          name: 'Mood',
          description: 'Find sake based on your current mood and occasion'
        },
        taste: {
          name: 'Taste',
          description: 'Discover sake that matches your taste preferences'
        },
        food: {
          name: 'Food Pairing',
          description: 'Perfect sake pairings for Japanese cuisine'
        }
      }
    }
  },
  ja: {
    home: {
      title: 'SAKEMIKKE',
      subtitle: '完璧な日本酒との出会い',
      startButton: '旅を始める',
      exploreButton: '日本酒を探る',
      copyright: '© 2024 SAKEMIKKE. All rights reserved.'
    },
    quiz: {
      title: 'あなたの選択',
      subtitle: '最適な日本酒を見つけるためのクイズを選んでください',
      back: '戻る',
      startQuiz: 'クイズを始める',
      options: {
        mood: {
          name: '気分',
          description: '気分や場面に合わせて日本酒を見つける'
        },
        taste: {
          name: '味わい',
          description: '好みの味に合わせて日本酒を見つける'
        },
        food: {
          name: '和食',
          description: '和食に合う日本酒を見つける'
        }
      }
    }
  }
};

const languages = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Initialize with a function to avoid running localStorage on server
  const [language, setLanguage] = useState(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferredLanguage');
      return saved || 'ja';
    }
    return 'ja';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = translations[language];

  // Handle hydration mismatch by delaying render
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}