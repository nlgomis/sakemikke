// app/quiz/beginner/result/page.js
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getResult } from '../getResult';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

export default function QuizResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const drink = searchParams.get('d');
  const concern = searchParams.get('c');
  const occasion = searchParams.get('o');

  const result = getResult(drink, concern, occasion);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <LanguageSwitcher />
      
      <button
        onClick={() => router.push('/quiz')}
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
          {t.beginner.result.backToQuiz}
        </span>
      </button>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-4xl font-light tracking-wider mb-4">
            {t.beginner.result.title}
          </h1>
          
          <div className="p-8 rounded-2xl bg-white/10 border border-white/30">
            <h2 className="text-6xl font-light tracking-widest mb-6">
              {result}
            </h2>
            <p className="text-xl text-blue-100/90 font-light tracking-wide">
              {t.beginner.result.subtitle}
            </p>
          </div>

          <button
            onClick={() => router.push('/quiz')}
            className="mt-8 px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 
                     border border-white/30 hover:border-white/50
                     transition-all duration-300 text-lg font-light tracking-wide"
          >
            {t.beginner.result.tryAgain}
          </button>
        </div>
      </main>
    </div>
  );
}