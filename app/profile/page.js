// app/profile/page.js
"use client";

import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

export default function Profile() {
  const { t } = useLanguage();
  const { user, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial username when user data is available
    if (user?.name) {
      setNewUsername(user.name);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Check authentication and redirect if needed
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show nothing while checking authentication
  if (isLoading || !isAuthenticated) {
    return null;
  }

  const handleUpdateUsername = async () => {
    try {
      const API_URL = process.env.NODE_ENV === 'production'
        ? `${process.env.BACK_URL}/users/update-username`
        : 'https://sakemikke-server-d7f7dhdgabfaawa5.japaneast-01.azurewebsites.net/api/users/update-username';

        const response = await fetch(API_URL, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ name: newUsername })
          });

      const data = await response.json();

      if (response.ok) {
        updateUser({ ...user, name: newUsername });
        setIsEditing(false);
        setUpdateError('');
      } else {
        setUpdateError(data.message || 'Update failed');
      }
    } catch (error) {
      setUpdateError('Failed to update username');
      console.error('Update error:', error);
    }
  };

  // Hardcoded quiz history data
  const quizHistory = [
    { id: 1, sake: "獺祭", image: "/images/2.png" },
    { id: 2, sake: "久保田", image: "/images/2.png" },
    { id: 3, sake: "八海山", image: "/images/2.png" },
    { id: 4, sake: "白鶴", image: "/images/2.png" },
    { id: 5, sake: "松竹梅", image: "/images/2.png" },
    { id: 6, sake: "大七", image: "/images/2.png" },
    { id: 8, sake: "浦霞", image: "/images/2.png" },
    { id: 9, sake: "新政", image: "/images/2.png" }
  ];

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
          
          {/* Username section with edit functionality */}
          <div className="flex flex-col items-center space-y-2 mb-2">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-black/30 border border-white/30 rounded px-3 py-1 text-white focus:outline-none focus:border-white/60"
                />
                <button
                  onClick={handleUpdateUsername}
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <Check className="w-5 h-5 text-green-400" />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewUsername(user.name);
                  }}
                  className="p-1 hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl text-white font-light">
                  {user?.name}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors duration-300"
                >
                  <Pencil className="w-4 h-4 text-white/70" />
                </button>
              </div>
            )}
            {updateError && (
              <p className="text-red-400 text-sm">{updateError}</p>
            )}
          </div>
          
          <p className="text-blue-100/70 mb-8">
            {user?.email}
          </p>

          <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12"></div>

          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl text-white/90 font-light mb-8 text-center">
              Quiz History
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {quizHistory.map((quiz) => (
                <div 
                  key={quiz.id}
                  className="aspect-square relative group bg-black/30 backdrop-blur-md rounded-[20px] overflow-hidden"
                >
                  <div className="absolute inset-[1px] border border-white/20 group-hover:border-white/40 transition-colors duration-300 rounded-[19px]">
                    <div className="h-full flex flex-col items-center justify-center p-4">
                      <h3 className="text-white/90 text-lg sm:text-xl mb-4 font-light text-center">
                        {quiz.sake}
                      </h3>
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                        <Image
                          src={quiz.image}
                          alt={quiz.sake}
                          fill
                          className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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