// app/sake-types/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SakeTypesPage() {
  return (
    <main className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <Image
        src="/images/background.png"
        alt="Background"
        fill
        priority
        className="object-cover object-center"
        quality={100}
      />

      {/* Content Wrapper */}
      <div className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-20">
        {/* Main Content Container - Centered */}
        <div className="flex flex-col items-center">
          {/* Header Section - Logo and Title side by side */}
          <div className="flex items-start gap-12 mb-32"> {/* Added flex for horizontal layout */}
            {/* Logo */}
            <div className="w-48 h-48 flex-shrink-0"> {/* Added flex-shrink-0 to prevent logo from shrinking */}
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={192}
                height={192}
                priority
                className="object-contain"
              />
            </div>

            {/* Title Section */}
            <div className="pt-8"> {/* Added padding top to align with logo */}
              <h1 className="text-5xl font-medium text-white mb-4 tracking-wider">
                ピックアップ日本酒一覧
              </h1>
              <h2 className="text-2xl text-white/90 mb-4 tracking-wider">Our Choices</h2>
              <p className="text-white/80 text-lg leading-relaxed tracking-wider">
                世界的に名高い日本酒をピックアップ。
                <br />
                あなたにぴったりの日本酒が、ここにあるはず。
              </p>
            </div>
          </div>

          {/* Sake Types */}
          <div className="flex justify-center space-x-8">
            {[
              { href: "/sake-list/tanrei-karakuchi", label: "淡麗辛口" },
              { href: "/sake-list/noujun-karakuchi", label: "濃醇辛口" },
              { href: "/sake-list/tanrei-amakuchi", label: "淡麗甘口" },
              { href: "/sake-list/noujun-amakuchi", label: "濃醇甘口" },
            ].map((type, index) => (
              <Link 
                key={index}
                href={type.href}
                className="group"
              >
                <div className="relative px-12 py-3 rounded-full border border-white/30 bg-white/5">
                  {/* Blur overlay */}
                  <div className="absolute inset-0 rounded-full backdrop-blur-sm" />
                  
                  {/* Text */}
                  <span className="relative text-xl text-white/90 font-light tracking-widest">
                    {type.label}
                  </span>

                  {/* Border glow effect */}
                  <div 
                    className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{
                      boxShadow: '0 0 10px rgba(255,255,255,0.2), inset 0 0 10px rgba(255,255,255,0.2)'
                    }} 
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}