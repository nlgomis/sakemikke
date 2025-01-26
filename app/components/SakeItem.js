'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImagePlus, X} from 'lucide-react';

const SakeItem = ({ sake, showType = false }) => {
  return (
    <div className="aspect-square relative p-1">
      <div 
        className="w-full h-full relative rounded-[32px] overflow-hidden 
                   bg-white/5 backdrop-blur-sm border border-white/20
                   group hover:bg-white/10 transition-all duration-300"
      >
        {/* Text overlay at top */}
        {showType && (
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="text-white/90 text-sm font-light">
              {sake.type}
            </div>
            <div className="text-white font-light whitespace-pre-line">
              {sake.name}
            </div>
          </div>
        )}

        {/* Image container */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
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