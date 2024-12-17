"use client";

import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    if (user?.name) {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (!user) return;
      
      try {
        const API_URL = process.env.NODE_ENV === 'production'
          ? `${process.env.BACK_URL}/users/quiz-history`
          : 'https://sakemikke-server-d7f7dhdgabfaawa5.japaneast-01.azurewebsites.net/api/users/quiz-history';

        const response = await fetch(API_URL, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch quiz history');

        const data = await response.json();
        setQuizHistory(data);
      } catch (error) {
        console.error('Error fetching quiz history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    if (user) {
      fetchQuizHistory();
    }
  }, [user]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  const SkeletonCard = () => (
    <div className="aspect-square relative bg-black/30 backdrop-blur-md rounded-[20px] overflow-hidden">
      <div className="absolute inset-[1px] border border-white/20 rounded-[19px]">
        <div className="h-full flex flex-col items-center justify-center p-4 space-y-4">
          <div className="h-6 w-3/4 bg-white/10 animate-pulse rounded"></div>
          <div className="w-20 h-20 bg-white/10 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative rounded-full overflow-hidden border-2 border-white/30 shadow-xl mb-6">
            <Image
              src="/images/1.svg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <h1 className="text-2xl sm:text-3xl text-white font-light mb-2">
            {user?.name}
          </h1>
          
          <p className="text-blue-100/70 mb-8">
            {user?.email}
          </p>

          <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"></div>

          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl text-white/90 font-light mb-8 text-center">
              Quiz History
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
  {isLoadingHistory ? (
    // Show skeleton cards while loading
    [...Array(8)].map((_, index) => (
      <SkeletonCard key={index} />
    ))
  ) : quizHistory.length > 0 ? (
    // Show actual quiz history
    quizHistory.map((sake, index) => (
      <div 
        key={index}
        className="aspect-square relative group bg-black/30 backdrop-blur-md rounded-[20px] overflow-hidden"
      >
       <div className="absolute inset-[1px] border border-white/20 group-hover:border-white/40 transition-colors duration-300 rounded-[19px]">
  <div className="h-full flex flex-col items-center justify-center p-2">
    {/* Image container - made padding smaller */}
    <div className="relative w-44 h-44 sm:w-52 sm:h-52 transition-transform duration-300 group-hover:scale-90">
      <Image
        src={`https://spheriart.s3.ap-northeast-1.amazonaws.com/${sake.id}.png`}
        alt={sake.name}
        fill
        className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
    
    {/* Name overlay - hidden by default, shown on hover */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-white text-lg sm:text-xl font-light text-center px-4">
        {sake.name}
      </h3>
    </div>
  </div>
</div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center text-white/70">
      まだクイズの履歴がありません
    </div>
  )}
</div>
          </div>
        </div>

        <footer className="py-4 sm:py-6 text-center text-blue-100/70 mt-auto">
          <p className="text-xs sm:text-sm font-light tracking-wider">
            {t.home.copyright}
          </p>
        </footer>
      </div>
    </div>
  );
}