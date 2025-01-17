"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HomeButton from "../components/HomeButton";
import { useLanguage } from "../contexts/LanguageContext";

export default function SakeTypesPage() {
  const { t } = useLanguage();
  const [sortedSakeList, setSortedSakeList] = useState({
    淡麗甘口: [],
    濃醇甘口: [],
    淡麗辛口: [],
    濃醇辛口: [],
  });
  const [activeTab, setActiveTab] = useState("淡麗辛口");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // 初回チェック
    checkMobileSize();

    // リサイズ時にチェック
    window.addEventListener("resize", checkMobileSize);

    // クリーンアップ
    return () => window.removeEventListener("resize", checkMobileSize);
  }, []);

  const classificationStyles = {
    濃醇甘口: {
      text: "text-white",
      active: "bg-blue-500/40",
      gradient: "from-red-500 to-red-300",
      textShadow: `
        -1px -1px 0 #ff6b8b,
        1px -1px 0 #ff6b8b,
        -1px 1px 0 #ff6b8b,
        1px 1px 0 #ff6b8b,
        0 0 10px rgba(255, 107, 139, 0.8),
        0 0 20px rgba(255, 107, 139, 0.6),
        0 0 30px rgba(255, 107, 139, 0.4)
      `,
    },
    淡麗甘口: {
      text: "text-white",
      active: "bg-blue-500/40",
      gradient: "from-sky-600 to-sky-400",
      textShadow: `
        -1px -1px 0 #4a90e2,
        1px -1px 0 #4a90e2,
        -1px 1px 0 #4a90e2,
        1px 1px 0 #4a90e2,
        0 0 10px rgba(74, 144, 226, 0.8),
        0 0 20px rgba(74, 144, 226, 0.6),
        0 0 30px rgba(74, 144, 226, 0.4)
      `,
    },
    濃醇辛口: {
      text: "text-white",
      active: "bg-blue-500/40",
      gradient: "from-[#9A210ECC] to-[#B8392680]",
      textShadow: `
        -1px -1px 0 #9A210ECC,
        1px -1px 0 #9A210ECC,
        -1px 1px 0 #9A210ECC,
        1px 1px 0 #9A210ECC,
        0 0 10px rgba(165, 42, 42, 0.8),
        0 0 20px rgba(165, 42, 42, 0.6),
        0 0 30px rgba(165, 42, 42, 0.4)
      `,
    },
    淡麗辛口: {
      text: "text-white",
      active: "bg-blue-500/40",
      gradient: "from-blue-600 to-blue-400",
      textShadow: `
        -1px -1px 0 #1052A7,
        1px -1px 0 #1052A7,
        -1px 1px 0 #1052A7,
        1px 1px 0 #1052A7,
        0 0 10px rgba(16, 82, 167, 0.8),
        0 0 20px rgba(16, 82, 167, 0.6),
        0 0 30px rgba(16, 82, 167, 0.4)
      `,
    },
  };
  useEffect(() => {
    async function fetchSakeData() {
      try {
        const response = await fetch(
          "https://backmikke.onrender.com/api/sake/"
        );
        const result = await response.json();

        const sortedData = {
          淡麗甘口: [],
          濃醇甘口: [],
          淡麗辛口: [],
          濃醇辛口: [],
        };

        result.data.forEach((sake) => {
          if (sortedData[sake.classification]) {
            sortedData[sake.classification].push(sake);
          }
        });

        setSortedSakeList(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
        setIsLoading(false);
      }
    }
    fetchSakeData();
  }, []);

  const calculateKeywordPosition = (index, total, isMobile) => {
    const horizontalRadius = isMobile ? 90 : 110;
    const verticalRadius = isMobile ? 60 : 90;
    const angle = (index * 2 * Math.PI) / total;
    const x = horizontalRadius * Math.cos(angle);
    const y = verticalRadius * Math.sin(angle);
    return { x, y };
  };

  const getKeywordColor = (index) => {
    const colors = ["bg-red-500/50", "bg-blue-500/50", "bg-purple-500/50"];
    return colors[index % colors.length];
  };

  const getGlowColor = (index) => {
    const colors = [
      "shadow-[0_0_15px_rgba(239,68,68,0.4)]",
      "shadow-[0_0_15px_rgba(59,130,246,0.4)]",
      "shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 bg-transparent">
      <div className="pt-24 md:pt-36 pb-16 md:pb-24 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="max-w-[90vw] lg:max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-12 md:gap-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-32">
                {/* Logo Container */}
                <div className="flex-shrink-0 flex items-center justify-center md:min-w-[300px] lg:min-w-[400px]">
                  <Image
                    src="/images/logo.png"
                    alt="Sake Mikke Logo"
                    width={300}
                    height={150}
                    className="w-[200px] md:w-[250px] lg:w-[300px]"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {t.sake.labels.featured}
                    <span className="block text-base md:text-xl font-normal mt-3 text-white/80">
                      Our Choices
                    </span>
                  </h1>
                  <p className="text-white/80 mt-6 text-base md:text-lg max-w-2xl leading-relaxed">
                    {t.sake.labels.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {Object.keys(sortedSakeList).map((classification) => (
              <button
                key={classification}
                onClick={() => setActiveTab(classification)}
                className={`
                  group
                  w-[calc(50%-0.5rem)] sm:w-[200px] px-4 sm:px-8 py-3 
                  rounded-full 
                  transition-all duration-300
                  border border-white/20
                  hover:scale-105
                  flex items-center justify-center
                  ${
                    activeTab === classification
                      ? `${classificationStyles[classification].active} `
                      : "bg-white/10 backdrop-blur-sm"
                  }
                `}
              >
                <span
                  className={`
                    text-sm whitespace-nowrap 
                    transition-all duration-300
                    ${classificationStyles[classification].text}
                  `}
                >
                  {t.sake.classification[classification]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 各セクションの表示 */}
      <div key={activeTab} className="mb-28">
        <div className="relative mb-12 flex items-center">
          <div className="flex-grow border-t border-white/30 mr-4"></div>
          <h1
            className="text-5xl text-center text-white z-10 bg-transparent px-8"
            style={classificationStyles[activeTab]}
          >
            {t.sake.classification[activeTab]}
          </h1>
          <div className="flex-grow border-t border-white/30 ml-4"></div>
        </div>

        <div
          className="grid grid-cols-1  md:grid-cols-2  xl:grid-cols-3    gap-4 
             bg-white/10 backdrop-blur-lg border border-white/20 
             rounded-xl p-1 sm:p-2 shadow-sm"
        >
          {sortedSakeList[activeTab].map((sake) => (
            <div
              key={sake.id}
              className="bg-transparent overflow-hidden transition-all duration-300 group/sake"
            >
              <div className="p-4">
                <div className="mb-3">
                  <div className="text-sm text-white/90">
                    {t.sake.types[sake.type]}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {t.sake.names[sake.name]}
                  </div>
                </div>

                <div className="relative h-80 mb-4 group">
                  <Image
                    src={`https://spheriart.s3.ap-northeast-1.amazonaws.com/${sake.id}.png`}
                    alt={`${sake.name}の画像`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-opacity duration-300 group-hover/sake:opacity-80"
                    priority={false}
                  />

                  {sake.keywords && sake.keywords.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {sake.keywords.map((keyword, index) => {
                        const position = calculateKeywordPosition(
                          index,
                          sake.keywords.length,
                          // Check screen size using window.innerWidth
                          typeof window !== "undefined" &&
                            window.innerWidth < 640
                        );
                        const bgColor = getKeywordColor(index);
                        const glowColor = getGlowColor(index);

                        return (
                          <div
                            key={keyword}
                            className={`absolute left-1/2 top-1/2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 
                                      group-hover/sake:opacity-100 transition-all duration-500
                                      sm:max-w-full max-w-[calc(100%-2rem)] w-auto`}
                            style={{
                              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                              transitionDelay: `${index * 100}ms`,
                            }}
                          >
                            <span
                              className={`${bgColor} ${glowColor} backdrop-blur-sm text-white 
                                         ${
                                           isMobile ? "text-xs" : "text-sm"
                                         } px-3 py-1.5 rounded-full whitespace-nowrap
                                         shadow-lg hover:shadow-xl transition-shadow duration-300
                                         inline-block max-w-full truncate`}
                            >
                              {t.sake.keywords[keyword]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-4 sm:mb-4 text-center text-xs sm:text-sm">
                  <div
                    className={`rounded-md bg-gradient-to-r p-1 ${classificationStyles[activeTab].gradient}`}
                  >
                    <div className="text-white truncate">
                      {t.sake.regionsTypes[sake.region]}
                    </div>
                  </div>
                  <div
                    className={`rounded-md bg-gradient-to-r p-1 ${classificationStyles[activeTab].gradient}`}
                  >
                    <div className="text-white truncate">
                      {t.sake.labels.polishing} {sake.polishingRate}%
                    </div>
                  </div>
                  <div
                    className={`rounded-md bg-gradient-to-r p-1 ${classificationStyles[activeTab].gradient}`}
                  >
                    <div className="text-white truncate">
                      alc. {sake.alcoholContent}%
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/100 mb-4">
                  {t.sake.description[sake.name]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto text-center mb-16">
        <Link href="/quiz" className=" text-white">
          <HomeButton>今すぐ酒みっけ！</HomeButton>
        </Link>
      </div>

      <footer className="w-full p-4 md:p-6 lg:p-8 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-20">
            {/* Left and Center Wrapper */}
            <div className="flex flex-row md:flex-none gap-6 md:gap-8">
              {/* Left Column */}
              <div className="flex flex-col items-start gap-6 md:gap-8">
                {/* Logo */}
                <Link href="/" className="block">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={200}
                    height={60}
                    className="w-40 md:w-48 lg:w-56"
                  />
                </Link>

                {/* Social Links */}
                <div className="flex items-center gap-4 md:gap-6 w-40 md:w-48 lg:w-56 justify-center">
                  <Link
                    href="https://line.me"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/images/line.png"
                      alt="LINE"
                      width={32}
                      height={32}
                      className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8"
                    />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/images/instagram.png"
                      alt="Instagram"
                      width={32}
                      height={32}
                      className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8"
                    />
                  </Link>
                  <Link
                    href="https://youtube.com"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/images/youtube.png"
                      alt="YouTube"
                      width={32}
                      height={32}
                      className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8"
                    />
                  </Link>
                </div>
              </div>

              {/* Center Column - Decorative Image */}
              <div className="flex items-center md:mx-8 lg:mx-16">
                <Image
                  src="/images/design.png"
                  alt="Decorative Element"
                  width={60}
                  height={200}
                  className="w-10 md:w-12 lg:w-16"
                />
              </div>
            </div>

            {/* Right Column - Contact Button */}
            <div className="w-full md:w-auto flex justify-center items-center mt-8 md:mt-0">
              <div>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center border-2 border-white text-white hover:bg-white/10 transition-colors duration-300"
                >
                  <span className="relative z-10 px-8 md:px-12 lg:px-16 py-6 md:py-10 lg:py-14 text-base md:text-lg lg:text-2xl tracking-wider">
                    CONTACT US
                  </span>
                  <div className="relative z-10 w-44 md:w-64 lg:w-80 h-[4rem] md:h-[5rem] lg:h-[6rem] flex items-center justify-end">
                    <div className="absolute top-1/2 -translate-y-1/2 w-32 md:w-44 lg:w-52 h-32 md:h-44 lg:h-52 border border-white rounded-full transition-transform duration-300 ease-out group-hover:translate-x-3"></div>
                    <svg
                      className="w-16 md:w-20 lg:w-28 h-5 md:h-6 mr-4 md:mr-6 lg:mr-10 transition-transform duration-300 ease-in group-hover:translate-x-3 delay-150"
                      viewBox="0 0 96 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="0" y1="12" x2="92" y2="12"></line>
                      <polyline points="84 6 92 12 84 18"></polyline>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Copyright Section */}
          <div className="mb-6 mt-12 md:mt-10 lg:mt-12 text-center text-xs md:text-sm">
            © 2025 SAKEMIKKE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
