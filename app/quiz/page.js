// app/quiz/page.js
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import GradientBackground from '../components/GradientbBackground';

export default function QuizSelector() {
  const router = useRouter();
  const { t } = useLanguage();

  const quizOptions = [
    {
      id: 'beginner',
      name: t.quiz.options.beginner.name,
      description: t.quiz.options.beginner.description,
      path: '/quiz/beginner',
      gradient: ' bg-gradient-to-br from-[rgb(7,39,113)] via-[rgb(44,52,127)]  to-[rgb(64,47,126)]',
      borderColor: 'border-rose-800/50'
    },
    {
      id: 'taste',
      name: t.quiz.options.taste.name,
      description: t.quiz.options.taste.description,
      path: '/quiz/taste',
      gradient: 'bg-gradient-to-bl from-[rgb(32,28,80)] via-[rgb(25,35,136)]  to-[rgb(35,113,190)]',
      borderColor: 'border-blue-400/30'
    },
    {
      id: 'food',
      name: t.quiz.options.food.name,
      description: t.quiz.options.food.description,
      path: '/quiz/washoku',
      gradient: 'bg-gradient-to-tr from-[rgb(35,40,92)] via-[rgb(33,144,201)]  to-[rgb(38,109,152)]',
      borderColor: 'border-teal-400/30'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0">
        <GradientBackground />
      </div>
      <main className="container mx-auto px-4 pt-40 relative z-1">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-12 tracking-wider">
            {t.quiz.title}
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100/90 font-light tracking-wide">
            {t.quiz.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {quizOptions.map((option) => (
            <Link
              key={option.id}
              href={option.path}
              className={`
                group relative overflow-hidden
                rounded-2xl p-8
                text-center
                border ${option.borderColor}
                // bg-gradient-to-br ${option.gradient}
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:bg-opacity-30
              `}
            >
              <div className="min-h-[240px] flex flex-col items-center justify-center gap-12">
                <div>
                  <h2 className="text-3xl font-light text-white mb-4 tracking-wider">
                    {option.name}
                  </h2>
                  <p className="text-blue-100/80 font-light tracking-wide mb-6">
                    {option.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300">
                  <span className="text-lg font-light tracking-wider">{t.quiz.startQuiz}</span>
                  {/* <svg 
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
                  </svg> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="relative z-1 py-6 text-center text-blue-100/70">
        <p className="text-sm font-light tracking-wider">{t.quiz.copyright}</p>
      </footer>
    </div>
  );
}