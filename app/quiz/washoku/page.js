"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';

export default function WashokuQuiz() {
  const router = useRouter();
  const { t } = useLanguage();
  const [state, setState] = useState({
    currentQuestion: 0,
    answers: {},
    subQuestions: null
  });

  const categories = [
    { value: '刺身', label: t.washoku.options.categories.sashimi },
    { value: '椀盛', label: t.washoku.options.categories.soup },
    { value: '焼き魚', label: t.washoku.options.categories.grilled },
    { value: '揚げ物', label: t.washoku.options.categories.fried },
    { value: '鍋', label: t.washoku.options.categories.nabe }
  ];

  const subQuestions = {
    '刺身': [
      { value: 'ぶり', label: t.washoku.options.sashimi.buri },
      { value: 'サーモン', label: t.washoku.options.sashimi.salmon },
      { value: 'ヒラメ', label: t.washoku.options.sashimi.hirame }
    ],
    '椀盛': [
      { value: '潮仕立て', label: t.washoku.options.soup.shio },
      { value: '白味噌仕立て', label: t.washoku.options.soup.white },
      { value: '八丁味噌仕立て', label: t.washoku.options.soup.hatcho }
    ],
    '焼き魚': [
      { value: 'サバの塩焼き', label: t.washoku.options.grilled.saba },
      { value: 'ブリの照り焼き', label: t.washoku.options.grilled.buri },
      { value: '鰆の西京焼き', label: t.washoku.options.grilled.sawara }
    ],
    '揚げ物': [
      { value: '鶏の竜田揚げ', label: t.washoku.options.fried.chicken },
      { value: 'とんかつ', label: t.washoku.options.fried.pork },
      { value: 'アナゴの天ぷら', label: t.washoku.options.fried.anago }
    ],
    '鍋': [
      { value: '寄せ鍋', label: t.washoku.options.nabe.yose },
      { value: 'すき焼き', label: t.washoku.options.nabe.sukiyaki },
      { value: 'ブリしゃぶ', label: t.washoku.options.nabe.buri }
    ]
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...state.answers };
    
    if (state.currentQuestion === 0) {
      newAnswers.category = answer;
      setState({
        currentQuestion: 1,
        answers: newAnswers,
        subQuestions: subQuestions[answer]
      });
    } else {
      newAnswers.specific = answer;
      router.push(`/quiz/washoku/result?c=${newAnswers.category}&s=${answer}`);
    }
  };

  const getCurrentQuestion = () => {
    if (state.currentQuestion === 0) {
      return {
        question: t.washoku.questions.category,
        options: categories,
        gradient: 'from-purple-500/20 to-blue-500/20',
        border: 'border-purple-400/30'
      };
    } else {
      return {
        question: t.washoku.questions[state.answers.category],
        options: state.subQuestions,
        gradient: 'from-blue-500/20 to-teal-500/20',
        border: 'border-blue-400/30'
      };
    }
  };

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-2xl mx-auto space-y-12">
          {/* Question Section */}
          <div className="text-center space-y-8">
            <div className={`
              p-8 rounded-2xl bg-gradient-to-br ${currentQuestion.gradient} 
              border ${currentQuestion.border} transition-all duration-500
            `}>
              <h2 className="text-3xl font-light tracking-wider">
                {currentQuestion.question}
              </h2>
            </div>
            
            <div className="h-2 bg-white/10 rounded-full">
              <div 
                className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${currentQuestion.gradient}`}
                style={{ width: `${((state.currentQuestion + 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Options Section */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`
                  w-full p-6 rounded-xl
                  bg-gradient-to-br ${currentQuestion.gradient} opacity-90
                  hover:opacity-100
                  border ${currentQuestion.border}
                  transition-all duration-300 
                  text-lg font-light tracking-wide
                  flex items-center justify-between
                  group hover:scale-[1.02]
                `}
              >
                <span className="ml-2">{option.label}</span>
                <svg 
                  className="w-5 h-5 text-white opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}