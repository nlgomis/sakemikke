"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';

export default function BeginnerQuiz() {
  const router = useRouter();
  const { t } = useLanguage();
  const [state, setState] = useState({
    currentQuestion: 0,
    answers: {}
  });

  // 各ボタンのアニメーションクラスを保持
  const [buttonAnimations, setButtonAnimations] = useState([]);

  // コンポーネントマウント時とquestion変更時に新しいアニメーションを割り当て
  useEffect(() => {
    const animations = [
      'animate-float-1',
      'animate-float-2',
      'animate-float-3',
      'animate-float-4',
      'animate-float-5',
      'animate-float-6',
      'animate-float-7',
      'animate-float-8',
    ];

    // アニメーションをシャッフル
    const shuffledAnimations = [...animations]
      .sort(() => Math.random() - 0.5)
      .slice(0, questions[state.currentQuestion].options.length);

    setButtonAnimations(shuffledAnimations);
  }, [state.currentQuestion]);

  const questions = [
    {
      question: t.beginner.questions.drink,
      options: [
        { value: 'ワイン', label: t.beginner.options.drinks.wine },
        { value: 'ビール', label: t.beginner.options.drinks.beer },
        { value: 'ハイボール', label: t.beginner.options.drinks.highball },
        { value: '飲まない', label: t.beginner.options.drinks.none }
      ]
    },
    {
      question: t.beginner.questions.concern,
      options: [
        { value: '甘い感じ', label: t.beginner.options.concerns.sweet },
        { value: '辛口', label: t.beginner.options.concerns.dry },
        { value: 'お酒感', label: t.beginner.options.concerns.alcohol }
      ]
    },
    {
      question: t.beginner.questions.occasion,
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
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full  max-w-2xl mx-auto space-y-12">
          {/* Question Section */}
          <div className="text-center space-y-8">
            <div className="p-8 rounded-2xl bg-gradient-quiz from-quiz-primary to-quiz-secondary border border-quiz-primary-dark/30">
              <h2 className="text-3xl font-light tracking-wider">
                {currentQuestion.question}
              </h2>
            </div>
            
            <div className="h-2 bg-white/10 rounded-full">
              <div 
                className="h-2 rounded-full bg-gradient-quiz from-quiz-primary to-quiz-secondary transition-all duration-500"
                style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Options Section */}
          <div className="grid grid-cols-2 gap-12 w-[50%] mx-auto">
            {currentQuestion.options.map((option, index) => {
              const isLastInThree = currentQuestion.options.length === 3 && index === 2;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`
                    relative
                    aspect-square
                    bg-gradient-quiz from-quiz-primary to-quiz-secondary
                    border border-quiz-primary-dark/30
                    rounded-full
                    flex flex-col items-center justify-center
                    p-4 space-y-2
                    text-lg font-light tracking-wide
                    transition-all duration-300
                    hover:scale-105
                    hover:shadow-lg
                    w-full
                    mx-auto
                    group
                    ${buttonAnimations[index] || ''}
                    ${isLastInThree ? 'col-span-2 mx-auto w-[calc(50%-1rem)]' : ''}
                  `}
                >
                  <span className="text-center">{option.label}</span>
                  <svg 
                    className="w-5 h-5 opacity-50 group-hover:opacity-100 transform group-hover:translate-y-1 transition-all duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}