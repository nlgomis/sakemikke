// app/quiz/page.js
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function QuizSelector() {
  const router = useRouter();
  const { t } = useLanguage();

  const quizOptions = [
    {
      id: 'beginner',
      name: t.quiz.options.beginner.name,
      description: t.quiz.options.beginner.description,
      path: '/quiz/beginner',
      gradient: 'from-purple-500/20 to-blue-500/20',
      borderColor: 'border-purple-400/30'
    },
    {
      id: 'taste',
      name: t.quiz.options.taste.name,
      description: t.quiz.options.taste.description,
      path: '/quiz/taste',
      gradient: 'from-blue-500/20 to-teal-500/20',
      borderColor: 'border-blue-400/30'
    },
    {
      id: 'food',
      name: t.quiz.options.food.name,
      description: t.quiz.options.food.description,
      path: '/quiz/food',
      gradient: 'from-teal-500/20 to-emerald-500/20',
      borderColor: 'border-teal-400/30'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      

      <main className="container mx-auto px-4 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-wider">
            {t.quiz.title}
          </h1>
          <p className="text-xl text-blue-100/90 font-light tracking-wide">
            {t.quiz.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {quizOptions.map((option) => (
            <Link
              key={option.id}
              href={option.path}
              className={`
                group relative overflow-hidden
                rounded-2xl p-8
                border ${option.borderColor}
                bg-gradient-to-br ${option.gradient}
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:bg-opacity-30
              `}
            >
              <div className="min-h-[240px] flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-light text-white mb-4 tracking-wider">
                    {option.name}
                  </h2>
                  <p className="text-blue-100/80 font-light tracking-wide mb-6">
                    {option.description}
                  </p>
                </div>
                
                <div className="flex items-center text-white/70 group-hover:text-white transition-colors duration-300">
                  <span className="text-lg font-light tracking-wider">{t.quiz.startQuiz}</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-blue-100/70">
        <p className="text-sm font-light tracking-wider">{t.quiz.copyright}</p>
      </footer>
    </div>
  );
}