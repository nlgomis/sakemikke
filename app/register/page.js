// app/register/page.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GradientBackground from '../components/GradientbBackground';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  console.log(process.env.NODE_ENV)
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
  
    try {
      const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.BACK_URL
  : 'https://sakemikke-server-d7f7dhdgabfaawa5.japaneast-01.azurewebsites.net/api/users/register';
  const response = await fetch('https://sakemikke-server-d7f7dhdgabfaawa5.japaneast-01.azurewebsites.net/api/users/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
      const data = await response.json();
      
      if (response.ok) {
        alert('登録が完了しました。ログインしてください。');
        router.push('/login');
      } else {
        setError(data.message || '登録に失敗しました');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('サーバーとの通信に失敗しました');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen">
      <GradientBackground className="fixed inset-0 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pt-32">
        <div className="w-full max-w-md relative">
          <div className="backdrop-blur-md bg-black/20 rounded-3xl border border-white/50 p-8 shadow-xl relative">
            <div 
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: 'linear-gradient(45deg, rgba(0,37,206,0.4), rgba(0,234,255,0.4))',
                filter: 'blur(20px)',
                animation: 'glow 4s ease-in-out infinite'
              }}
            />

            <div className="relative z-10">
              <h1 className="text-3xl text-white font-light mb-8 tracking-wider">
                新規登録
              </h1>

              {error && (
                <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-white text-sm">
                    ユーザー名
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-white text-sm">
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-white text-sm">
                    パスワード
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-white text-sm">
                    確認のためもう一度ご入力ください
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all duration-300"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white/10 hover:bg-white/20 text-white rounded-lg px-4 py-3 transition-all duration-300 relative overflow-hidden group disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {loading ? '登録中...' : '確認画面へ'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-8 text-white/50 text-sm">
            © 2024 SAKEMIKKE. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}