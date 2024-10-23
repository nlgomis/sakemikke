// app/contexts/LanguageContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    navigation:{
      quiz: 'Quiz',
      types: 'Types of Sake',
      about: 'About',
      contact: 'Contact'
    },
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
        beginner: {
          name: 'Beginner',
          description: 'Recommended for those new to sake'
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
    },
    beginner: {
      questions: {
        drink: 'What do you usually drink?',
        concern: 'What aspects of sake make you hesitant?',
        occasion: 'When would you like to drink sake?'
      },
      options: {
        drinks: {
          wine: 'Wine',
          beer: 'Beer',
          highball: 'Highball',
          none: "Don't drink"
        },
        concerns: {
          sweet: 'Sweet taste',
          dry: 'Dry taste',
          alcohol: 'Alcohol presence'
        },
        occasions: {
          relax: 'When relaxing',
          food: 'With meals'
        }
      },
      result: {
        title: 'Recommended Sake',
        subtitle: 'This sake is perfect for you',
        tryAgain: 'Try Another Quiz',
        backToQuiz: 'Back to Quiz Selection'
      }
    }
  },
  ja: {
    navigation:{
      quiz: '診断',
      types: '日本酒の種類',
      about: 'About',
      contact: 'Contact'
    },
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
        beginner: {
          name: '初心者',
          description: '日本酒を始めて飲む方におすすめ'
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
    },
    beginner: {
      questions: {
        drink: '普段はお酒飲みますか',
        concern: '日本酒のどんな所に苦手意識持っていますか',
        occasion: 'どんな場面で飲みたいですか'
      },
      options: {
        drinks: {
          wine: 'ワイン',
          beer: 'ビール',
          highball: 'ハイボール',
          none: '飲まない'
        },
        concerns: {
          sweet: '甘い感じ',
          dry: '辛口',
          alcohol: 'お酒感'
        },
        occasions: {
          relax: 'リラックス時',
          food: '食事と一緒に'
        }
      },
      result: {
        title: 'おすすめの日本酒',
        subtitle: 'あなたにぴったりの日本酒です',
        tryAgain: 'もう一度クイズを試す',
        backToQuiz: 'クイズ選択に戻る'
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
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferredLanguage') || 'ja';
    }
    return 'ja';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = translations[language];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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