"use client";

import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImagePlus, X} from 'lucide-react';


export default function Profile() {
  const { t } = useLanguage();
  const { user, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [likedSakes, setLikedSakes] = useState([]);
  const [isLoadingLikes, setIsLoadingLikes] = useState(true);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Generate array of avatar numbers 1-21
  const avatarOptions = Array.from({ length: 21 }, (_, i) => i + 1);
  const SakeItem = ({ sake = false }) => {
    const handleClick = () => {
      if (sake?.url) {
        window.open(sake.url, '_blank');
      }
    };
  
    return (
      <div 
        className="aspect-square relative p-1 cursor-pointer"
        onClick={handleClick}
      >
        <div 
          className="w-full h-full relative rounded-[32px] overflow-hidden 
                     bg-white/15 backdrop-blur-sm border-2 border-white/20
                     group hover:bg-white/15 transition-all duration-300"
        >
          {sake && (
            <div className="absolute top-4 left-4 right-4 z-0">
              <div className="text-white font-light whitespace-pre-line">
                {t.sake.names[sake.name]}
              </div>
            </div>
          )}
  
          <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
            <div className="relative w-full h-full">
              <Image
                src={`https://spheriart.s3.ap-northeast-1.amazonaws.com/${sake.id}.png`}
                alt={sake.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
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
          ? 'https://backmikke.onrender.com/api/users/quiz-history'
          : 'https://backmikke.onrender.com/api/users/quiz-history';

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

  useEffect(() => {
    const fetchLikedSakes = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('https://backmikke.onrender.com/api/likes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch liked sakes');

        const data = await response.json();
        setLikedSakes(data);
      } catch (error) {
        console.error('Error fetching liked sakes:', error);
      } finally {
        setIsLoadingLikes(false);
      }
    };

    if (user) {
      fetchLikedSakes();
    }
  }, [user]);

  const AvatarSelectionModal = () => {
    if (!showAvatarModal) return null;

    const handleImageSelect = async (imageNumber) => {
      try {
        const response = await fetch('https://backmikke.onrender.com/api/users/update-image', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ image: imageNumber.toString() })
        });

        const data = await response.json();
        if (response.ok) {
          // Update the user data in auth context
          updateUser({
            ...user,
            image: imageNumber.toString()
          });
          setShowAvatarModal(false); // Close modal after successful update
        }
      } catch (error) {
        console.error('Error updating image:', error);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop with subtle blur */}
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setShowAvatarModal(false)}
        />
        
        {/* Outer container */}
        <div className="relative z-50 w-full max-w-3xl rounded-3xl">
          {/* Glass card wrapper */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.16)] relative">
            {/* Enhanced gradient overlay */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                filter: "blur(10px)",
              }}
            />

            {/* Animated glow effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-40"
              style={{
                background: "linear-gradient(45deg, rgba(0,37,206,0.2), rgba(0,234,255,0.2))",
                filter: "blur(30px)",
                animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />

            {/* Content wrapper with fixed header */}
            <div className="relative z-10 flex flex-col rounded-3xl max-h-[70vh]">
              {/* Fixed Header */}
              <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl text-white font-extralight tracking-wider">
                  {t.auth.profile.avatar}
                </h2>
                <button 
                  onClick={() => setShowAvatarModal(false)}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 pt-0">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
                  {Array.from({ length: 21 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => handleImageSelect(num)}
                      className={`group relative aspect-square rounded-full overflow-hidden border-2 
                        ${user?.image === num.toString() 
                          ? 'border-blue-400/60' 
                          : 'border-white/20 hover:border-white/40'} 
                        transition-all duration-300`}
                    >
                      <Image
                        src={`/images/avatars/${num}.png`}
                        alt={`Avatar ${num}`}
                        fill
                        className="object-cover"
                      />
                      {/* Selection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



 

  const SkeletonCard = () => (
    <div className="aspect-square relative p-1">
      <div className="w-full h-full rounded-[32px] bg-white/5 backdrop-blur-sm border border-white/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 h-2/3 bg-white/10 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading || !isAuthenticated) {
    return null;
  }


  return (
    <div className="relative min-h-screen">
      
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pt-24">
        {/* Profile Header Section */}
        <div className="flex flex-col items-center">
          <div className='relative'>
            <div className="w-32 h-32 sm:w-40 sm:h-40 relative rounded-full overflow-hidden border-2 border-white/30 shadow-xl mb-6">
              <div className="absolute inset-0 scale-150">
                <Image
                  src={"/images/avatars/"+user?.image + ".png" || "/images/1.svg"}               
                  alt={`${user?.name}'s profile`}
                  fill
                  className="object-cover translate-y-4"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = "/images/avatars/"+user?.image + ".png" || "/images/1.svg";
                  }}
                />
              </div>
            </div>
            <div onClick={() => setShowAvatarModal(true)} className="absolute bottom-5 -right-1 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <ImagePlus size={15} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl text-white font-light mb-2">
            {user?.name}
          </h1>
        
        </div>

        <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"></div>

        <div className="w-full max-w-7xl mx-auto mb-16">
          <h2 className="text-2xl text-white font-light mb-8 ps-1">
            {t.auth.profile.history}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {isLoadingHistory ? (
              [...Array(10)].map((_, index) => (
                <SkeletonCard key={`history-skeleton-${index}`} />
              ))
            ) : quizHistory.length > 0 ? (
              quizHistory.map((sake, index) => (
                <SakeItem key={`history-${index}`} sake={sake} />
              ))
            ) : (
              <div className="col-span-full text-center text-white/70 py-8">
                {t.auth.profile.noHistory}
              </div>
            )}
          </div>
        </div>

        {/* Liked Sakes Section */}
        <div className="w-full max-w-7xl mx-auto mb-16">
          <h2 className="text-2xl text-white font-light mb-8 ps-1">
            {t.auth.profile.liked}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {isLoadingLikes ? (
              [...Array(10)].map((_, index) => (
                <SkeletonCard key={`like-skeleton-${index}`} />
              ))
            ) : likedSakes.length > 0 ? (
              likedSakes.map((sake, index) => (
                <SakeItem key={`like-${index}`} sake={sake} />
              ))
            ) : (
              <div className="col-span-full text-center text-white/70 py-8">
                {t.auth.profile.noLiked}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-4 sm:py-6 text-center text-white/70 mt-auto">
          <p className="text-xs sm:text-sm font-light tracking-wider">
            {t.home.copyright}
          </p>
        </footer>
      </div>
      <AvatarSelectionModal />
    </div>
  );
}