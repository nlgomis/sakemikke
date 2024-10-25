"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getResult } from '../getResult';

export default function QuizResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const taste = searchParams.get('t');
  const mood = searchParams.get('m');
  const pairing = searchParams.get('p');

  const result = getResult(taste, mood, pairing);

  // Define gradient based on sake type
  const getGradient = (sake) => {
    switch(sake) {
      case '獺祭':
      case '獺祭 純米大吟醸 磨き三割九分':
      case '獺祭 純米大吟醸 磨き二割三分':
      case '獺祭 純米大吟醸50':
      case '獺祭 純米大吟醸45':
        return 'from-purple-500/20 to-blue-500/20';
      case '久保田':
      case '久保田 千寿':
      case '久保田 碧寿':
        return 'from-blue-500/20 to-teal-500/20';
      case '黒龍':
      case '黒龍 大吟醸':
      case '黒龍 純米吟醸':
      case '黒龍 しずく 純米大吟醸':
      case '黒龍 吟醸':
        return 'from-teal-500/20 to-emerald-500/20';
      case '八海山':
      case '八海山 本醸造':
      case '八海山 特別本醸造':
      case '八海山 純米吟醸':
        return 'from-blue-400/20 to-purple-500/20';
      default:
        return 'from-emerald-500/20 to-blue-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-16">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Decorative element */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-[1px] bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/20 -mt-[3px] mx-4"></div>
            <div className="w-32 h-[1px] bg-white/20"></div>
          </div>

          {/* Main title */}
          <h1 className="text-2xl font-light tracking-[0.25em] text-white/80">
            {t.taste.result.title}
          </h1>

          {/* Result card */}
          <div className={`
            p-12 rounded-2xl border border-white/10
            bg-gradient-to-br ${getGradient(result)}
            transform hover:scale-[1.01] transition-all duration-500
          `}>
            {/* Japanese result name */}
            <div className="mb-6">
              <h2 className="text-7xl font-light tracking-widest mb-4">
                {result}
              </h2>
              <div className="h-[1px] w-24 mx-auto bg-white/20"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-white/80 font-light tracking-wider">
              {t.taste.result.subtitle}
            </p>
          </div>

          {/* Bottom decorative lines */}
          <div className="flex justify-center space-x-1 mb-8">
            <div className="w-16 h-[1px] bg-white/10"></div>
            <div className="w-4 h-[1px] bg-white/20"></div>
            <div className="w-2 h-[1px] bg-white/30"></div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => router.push('/quiz/taste')}
              className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 
                      border border-white/30 hover:border-white/50
                      transition-all duration-300 text-lg font-light tracking-wider"
            >
              {t.taste.result.tryAgain}
            </button>
            <button
              onClick={() => router.push('/quiz')}
              className="px-8 py-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20
                      border border-blue-400/30 hover:border-blue-400/50
                      transition-all duration-300 text-lg font-light tracking-wider"
            >
              {t.taste.result.backToQuiz}
            </button>
          </div>
        </div>
      </main>

      {/* Bottom decorative pattern */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none 
                    bg-gradient-to-t from-black to-transparent opacity-80">
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5"></div>
        <div className="absolute bottom-2 left-0 w-full h-px bg-white/5"></div>
      </div>
    </div>
  );
}