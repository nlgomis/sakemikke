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
    },
    taste: {
      questions: {
        taste: 'What kind of taste do you prefer?',
        mood: 'What kind of atmosphere do you like?',
        pairing: 'What would you like to pair it with?'
      },
      options: {
        tastes: {
          kire: 'Crisp',
          fruity: 'Fruity',
          sweet: 'Sweet',
          dry: 'Dry'
        },
        moods: {
          refreshing: 'Refreshing',
          smooth: 'Smooth',
          heavy: 'Rich',
          elegant: 'Elegant'
        },
        pairings: {
          western: 'Western Food',
          japanese: 'Japanese Food',
          dessert: 'Dessert',
          alone: 'By Itself'
        }
      },
      result: {
        title: 'Your Perfect Sake Match',
        subtitle: 'Based on your taste preferences',
        tryAgain: 'Try Another Match',
        backToQuiz: 'Back to Quiz Selection'
      }
    },
    washoku: {
      questions: {
        category: 'What kind of food do you like?',
        '刺身': 'Which sashimi do you prefer?',
        '椀盛': 'Which type of soup do you prefer?',
        '焼き魚': 'Which grilled fish do you prefer?',
        '揚げ物': 'Which fried dish do you prefer?',
        '鍋': 'Which hot pot dish do you prefer?'
      },
      options: {
        categories: {
          sashimi: 'Sashimi',
          soup: 'Soup',
          grilled: 'Grilled Fish',
          fried: 'Fried Dishes',
          nabe: 'Hot Pot'
        },
        sashimi: {
          buri: 'Yellowtail',
          salmon: 'Salmon',
          hirame: 'Flounder'
        },
        soup: {
          shio: 'Clear Soup',
          white: 'White Miso Soup',
          hatcho: 'Hatcho Miso Soup'
        },
        grilled: {
          saba: 'Grilled Mackerel with Salt',
          buri: 'Yellowtail Teriyaki',
          sawara: 'Grilled Spanish Mackerel with Miso'
        },
        fried: {
          chicken: 'Fried Chicken Karaage',
          pork: 'Pork Cutlet',
          anago: 'Conger Eel Tempura'
        },
        nabe: {
          yose: 'Yose Nabe',
          sukiyaki: 'Sukiyaki',
          buri: 'Yellowtail Shabu-shabu'
        }
      },
      result: {
        title: 'Perfect Sake Pairing',
        subtitle: 'This sake complements your dish perfectly',
        tryAgain: 'Try Another Pairing',
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
    },
    taste: {
      questions: {
        taste: 'どんな味わいが好きですか？',
        mood: 'どんな雰囲気が好きですか？',
        pairing: '何と合わせたいですか？'
      },
      options: {
        tastes: {
          kire: 'キレ',
          fruity: 'フルーティー',
          sweet: '甘口',
          dry: '辛口'
        },
        moods: {
          refreshing: 'さわやか',
          smooth: '滑らか',
          heavy: '重たい',
          elegant: '華やか'
        },
        pairings: {
          western: '洋食',
          japanese: '和食',
          dessert: 'デザート',
          alone: '単体'
        }
      },
      result: {
        title: 'あなたの味わいにぴったりの日本酒',
        subtitle: 'あなたの好みに合わせた日本酒です',
        tryAgain: 'もう一度試す',
        backToQuiz: '診断選択に戻る'
      }
    },
    washoku: {
      questions: {
        category: 'どんな料理がお好きですか？',
        '刺身': 'どの刺身がお好みですか？',
        '椀盛': 'どの椀物がお好みですか？',
        '焼き魚': 'どの焼き魚がお好みですか？',
        '揚げ物': 'どの揚げ物がお好みですか？',
        '鍋': 'どの鍋料理がお好みですか？'
      },
      options: {
        categories: {
          sashimi: '刺身',
          soup: '椀盛',
          grilled: '焼き魚',
          fried: '揚げ物',
          nabe: '鍋'
        },
        sashimi: {
          buri: 'ぶり',
          salmon: 'サーモン',
          hirame: 'ヒラメ'
        },
        soup: {
          shio: '潮仕立て',
          white: '白味噌仕立て',
          hatcho: '八丁味噌仕立て'
        },
        grilled: {
          saba: 'サバの塩焼き',
          buri: 'ブリの照り焼き',
          sawara: '鰆の西京焼き'
        },
        fried: {
          chicken: '鶏の竜田揚げ',
          pork: 'とんかつ',
          anago: 'アナゴの天ぷら'
        },
        nabe: {
          yose: '寄せ鍋',
          sukiyaki: 'すき焼き',
          buri: 'ブリしゃぶ'
        }
      },
      result: {
        title: '料理に合う日本酒',
        subtitle: 'この料理にぴったりの日本酒です',
        tryAgain: 'もう一度試す',
        backToQuiz: '診断選択に戻る'
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