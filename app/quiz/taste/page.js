"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TasteQuiz() {
  const router = useRouter();
  const { t } = useLanguage();
  const [state, setState] = useState({
    currentQuestion: 0,
    answers: {}
  });

  const questions = [
    {
      question: t.taste.questions.taste,
      gradient: 'from-purple-500/20 to-blue-500/20',
      border: 'border-purple-400/30',
      options: [
        { value: 'キレ', label: t.taste.options.tastes.kire },
        { value: 'フルーティー', label: t.taste.options.tastes.fruity },
        { value: '甘口', label: t.taste.options.tastes.sweet },
        { value: '辛口', label: t.taste.options.tastes.dry }
      ]
    },
    {
      question: t.taste.questions.mood,
      gradient: 'from-blue-500/20 to-teal-500/20',
      border: 'border-blue-400/30',
      options: [
        { value: 'さわやか', label: t.taste.options.moods.refreshing },
        { value: '滑らか', label: t.taste.options.moods.smooth },
        { value: '重たい', label: t.taste.options.moods.heavy },
        { value: '華やか', label: t.taste.options.moods.elegant }
      ]
    },
    {
      question: t.taste.questions.pairing,
      gradient: 'from-teal-500/20 to-emerald-500/20',
      border: 'border-teal-400/30',
      options: [
        { value: '洋食', label: t.taste.options.pairings.western },
        { value: '和食', label: t.taste.options.pairings.japanese },
        { value: 'デザート', label: t.taste.options.pairings.dessert },
        { value: '単体', label: t.taste.options.pairings.alone }
      ]
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...state.answers };
    
    switch (state.currentQuestion) {
      case 0:
        newAnswers.taste = answer;
        break;
      case 1:
        newAnswers.mood = answer;
        break;
      case 2:
        newAnswers.pairing = answer;
        break;
    }

    const newState = {
      currentQuestion: state.currentQuestion + 1,
      answers: newAnswers
    };

    if (state.currentQuestion === 2) {
      router.push(
        `/quiz/taste/result?t=${newAnswers.taste}&m=${newAnswers.mood}&p=${newAnswers.pairing}`
      );
    } else {
      setState(newState);
    }
  };

  const currentQuestion = questions[state.currentQuestion];

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
                style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Options Section */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
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