// app/quiz/beginner/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function BeginnerQuiz() {
  const router = useRouter();
  const { t } = useLanguage();
  const [state, setState] = useState({
    currentQuestion: 0,
    answers: {}
  });

  const questions = [
    {
      question: t.beginner.questions.drink,
      gradient: 'from-purple-500/20 to-blue-500/20',
      border: 'border-purple-400/30',
      options: [
        { value: 'ワイン', label: t.beginner.options.drinks.wine },
        { value: 'ビール', label: t.beginner.options.drinks.beer },
        { value: 'ハイボール', label: t.beginner.options.drinks.highball },
        { value: '飲まない', label: t.beginner.options.drinks.none }
      ]
    },
    {
      question: t.beginner.questions.concern,
      gradient: 'from-blue-500/20 to-teal-500/20',
      border: 'border-blue-400/30',
      options: [
        { value: '甘い感じ', label: t.beginner.options.concerns.sweet },
        { value: '辛口', label: t.beginner.options.concerns.dry },
        { value: 'お酒感', label: t.beginner.options.concerns.alcohol }
      ]
    },
    {
      question: t.beginner.questions.occasion,
      gradient: 'from-teal-500/20 to-emerald-500/20',
      border: 'border-teal-400/30',
      options: [
        { value: 'リラックス時', label: t.beginner.options.occasions.relax },
        { value: '食事と一緒に', label: t.beginner.options.occasions.food }
      ]
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...state.answers };
    
    switch (state.currentQuestion) {
      case 0:
        newAnswers.drink = answer;
        break;
      case 1:
        newAnswers.concern = answer;
        break;
      case 2:
        newAnswers.occasion = answer;
        break;
    }

    const newState = {
      currentQuestion: state.currentQuestion + 1,
      answers: newAnswers
    };

    if (state.currentQuestion === 2) {
      router.push(
        `/quiz/beginner/result?d=${newAnswers.drink}&c=${newAnswers.concern}&o=${newAnswers.occasion}`
      );
    } else {
      setState(newState);
    }
  };

  const currentQuestion = questions[state.currentQuestion];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <LanguageSwitcher />
      
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center group"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 
                      hover:bg-white/20 transition-all duration-300 border border-white/30">
          <svg 
            className="w-5 h-5 text-white transform group-hover:-translate-x-0.5 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <span className="ml-2 text-white/70 group-hover:text-white text-sm font-light tracking-wider transition-colors duration-300">
          {t.quiz.back}
        </span>
      </button>

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