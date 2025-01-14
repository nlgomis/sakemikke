"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

const LocationTimeHeader = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateDateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}: ${minutes}: ${seconds}`);
    }

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-8 px-4">
      <div className="container mx-auto pb-10">
        <div className="flex items-center justify-between gap-11 sm:gap-8 md:gap-16 lg:gap-56 text-xs md:text-base text-white">
          {/* Location with Icon */}
          <div className="font text-xs md:text-lg tracking-wider flex-1 text-right flex items-center justify-end">
            <img
              src="/images/marker.png"
              alt="Location Icon"
              className="w-5 h-5 mr-1"
            />
            <span>TOKYO JAPAN</span>
          </div>

          {/* Animated Center Line Container */}
          <div className="flex-1 relative h-[1px] overflow-hidden">
            {/* Static Background Line */}
            <div className="absolute w-full h-full bg-white/20" />

            {/* Animated Line */}
            <div className="absolute w-full h-full">
              <div className="absolute inset-0 animate-flow">
                <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent" />
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="font text-xs md:text-lg tracking-widest text-left flex-1 space-x-2">
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
@keyframes flowAnimation {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-flow {
  animation: flowAnimation 2s linear infinite;
}
`;

// Add styles to the document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Custom icon components
const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-8 h-8"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-8 h-8"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-8 h-8"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Component() {
  const [hoveredSection, setHoveredSection] = useState(null);

  const sections = [
    {
      title: "初心者",
      description: "日本酒を始めて飲む方",
    },
    {
      title: "味わい",
      description: "好みの味を合わせて日本酒を見つける",
    },
    {
      title: "和食",
      description: "和食に合う日本酒を見つける",
    },
  ];

  const testimonials = [
    {
      text: "お酒初心者の私でもわかりやすい質問でとても楽しく診断できたよ！またお酒に迷ったら利用したい！！",
      imageSrc: "/images/human1.png?height=80&width=80",
      imageAlt: "Testimonial 1",
      position: "left",
    },
    {
      text: "日本語よりも英語のが慣れているので英語に対応しているのがとても良いと思う！外国人の友人にも紹介したい！",
      imageSrc: "/images/human2.png?height=80&width=80",
      imageAlt: "Testimonial 2",
      position: "right",
    },
    {
      text: "普段からお酒は飲むほうですがいまいち自分に合ったお酒がわからなかったので、酒見っけを利用してぴったりなお酒が見つけられてとても満足！",
      imageSrc: "/images/human3.png?height=80&width=80",
      imageAlt: "Testimonial 3",
      position: "left",
    },
  ];

  const [heroRef, isHeroVisible] = useFadeInOnScroll(0);
  const [imageRef, isImageVisible] = useFadeInOnScroll(0); // 即時表示
  const [textRef, isTextVisible] = useFadeInOnScroll(400); // 0.4秒遅延
  const [menuRef, isMenuVisible] = useFadeInOnScroll(0);
  const [featuresRef, isFeaturesVisible] = useFadeInOnScroll(100);
  const [testimonialRef, isTestimonialVisible] = useFadeInOnScroll(100);

  return (
    <main className="min-h-screen  text-white relative overflow-hidden">
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-center px-4 sm:px-8">
          <div
            ref={heroRef}
            className={`fade-in-section ${
              isHeroVisible ? "is-visible" : ""
            } relative w-full max-w-[90vw] sm:max-w-3xl mx-auto text-center`}
          >
            <div className="inline-block text-left ">
              <h1 className="text-3xl  md:text-6xl lg:text-7xl font-bold mb-12 tracking-tighter">
                <span className="block">HEY!</span>
                <span className="block whitespace-nowrap">
                  WE&apos;RE SAKEMIKKE!
                </span>
              </h1>
            </div>

            <div className="flex justify-center gap-6 sm:gap-8">
              <Link href="#" className="transition-transform hover:scale-110">
                <Image
                  src="/images/line.png"
                  alt="Message"
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </Link>
              <Link href="#" className="transition-transform hover:scale-110">
                <Image
                  src="/images/instagram.png"
                  alt="Instagram"
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </Link>
              <Link href="#" className="transition-transform hover:scale-110">
                <Image
                  src="/images/youtube.png"
                  alt="YouTube"
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
            <span className="text-sm tracking-widest">SCROLL</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white animate-scrollLine" />
            </div>
          </div>
        </section>
        {/* Product Section */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center mb-24">
              酒見っけとは
            </h2>
            <div className="grid md:grid-cols-2 gap-24 items-center">
              <div
                ref={imageRef}
                className={`fade-in-section ${
                  isImageVisible ? "is-visible" : ""
                } relative h-[560px]`}
              >
                <Image
                  src="/images/about.png"
                  alt="Sake bottles"
                  fill
                  className="object-contain"
                />
              </div>
              <div
                ref={textRef}
                className={`fade-in-section ${
                  isTextVisible ? "is-visible" : ""
                } space-y-8 text-base md:text-lg`}
              >
                <p>
                  初心者から通まで利用できる自分にピッタリな日本酒を見つけることができる体験型ウェブサイトです。
                </p>
                <p>
                  初心者、味わい、料理の三つのカテゴリーから選んで質問に答えて自分に合った日本酒を見つけよう
                </p>
                <p>
                  PC,スマートフォンどちらからもアクセス可能で過去の診断結果も保存できるからいつでもどこでも確認可能！
                </p>
                <p>
                  また、英語、日本語に対応で幅広いユーザーに利用していただけます。
                </p>
                <p>
                  お酒初心者の方でもわかりやすい説明と銘酒の詳しい紹介があるので初心者でも心配なし！
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Menu Section */}
        <section
          ref={menuRef}
          className={`fade-in-section ${
            isMenuVisible ? "is-visible" : ""
          } py-6 md:pt-20 pb-8`}
        >
          <div className="w-full min-h-[300px] md:min-h-[400px]  md:p-8">
            <div className="container mx-auto max-w-full">
              <div className="flex flex-col items-center border-t border-b border-white py-6 md:py-6 relative">
                <div className="relative w-full flex justify-center">
                  {/* Left vertical border - top と bottom の値を調整 */}
                  <div className="hidden lg:block absolute -top-6 -bottom-6 left-[12%] w-px bg-white" />

                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center w-full md:w-auto px-4 md:px-0">
                    {sections.map((section) => (
                      <div
                        key={section.title}
                        className="relative group w-full md:w-auto cursor-default"
                        onMouseEnter={() => setHoveredSection(section.title)}
                        onMouseLeave={() => setHoveredSection(null)}
                      >
                        <div className="w-full md:w-48 min-w-[200px] h-32 md:h-48 border border-white overflow-hidden transition-all duration-500 ease-in-out hover:bg-white hover:bg-opacity-10">
                          <div className="relative h-full w-full">
                            {/* Title Container */}
                            <div
                              className={`absolute w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
                                hoveredSection === section.title
                                  ? "-translate-y-full opacity-0"
                                  : "translate-y-0 opacity-100"
                              }`}
                            >
                              <span className="text-lg md:text-xl font-medium text-white px-4 text-center">
                                {section.title}
                              </span>
                            </div>

                            {/* Description Container */}
                            <div
                              className={`absolute w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
                                hoveredSection === section.title
                                  ? "translate-y-0 opacity-100"
                                  : "translate-y-full opacity-0"
                              }`}
                            >
                              <span className="text-base md:text-lg text-white px-4 text-center">
                                {section.description}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right vertical border - top と bottom の値を調整 */}
                  <div className="hidden lg:block absolute -top-6 -bottom-6  right-[12%] w-px bg-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={featuresRef}
          className={`fade-in-section ${
            isFeaturesVisible ? "is-visible" : ""
          } pt-12 pb-24 px-4`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl text-center mb-20">
              酒見っけの独自性
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 ">
              {[
                { num: "1", text: "豊富な選択肢​\n　　　　　　　　　​​" },
                { num: "2", text: "初心者でも​\n​わかりやすい説明　　" },
                { num: "3", text: "銘酒の詳細​\n　　　　　　　　　　​" },
                { num: "4", text: "ユーザー履歴の​​閲覧​\n　　　　　　" },
                { num: "5", text: "多言語 海外の人にも​\n　　　　​​　" },
                { num: "6", text: "PC・スマホ\n どこでも、いつでも​​" },
              ].map((feature) => (
                <div
                  key={feature.num}
                  className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md px-8 py-14 rounded-lg flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-white rounded-full" />
                      <div className="w-4 h-4 bg-white rounded-full my-1" />
                      <div className="w-4 h-4 bg-red-600 rounded-full" />
                    </div>

                    <span className="text-4xl font-bold self-end -mb-0.5">
                      {feature.num}
                    </span>
                  </div>
                  <p className="text-base md:text-xl mt-6 leading-tight whitespace-pre-line">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12">
          <div className="relative w-full">
            <div className="absolute inset-x-0 top-0 h-px bg-white" />
            <div className="container mx-auto">
              <h2 className="py-6 text-center text-xl font-medium tracking-wider text-white sm:text-4xl md:text-5xl">
                ここに見っけ！ あなたの一杯、
              </h2>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-white" />
          </div>
        </section>
        {/* Testimonials */}
        <section
          ref={testimonialRef}
          className={`fade-in-section ${
            isTestimonialVisible ? "is-visible" : ""
          } relative w-full overflow-hidden pt-16 pb-24 md:py-28`}
        >
          <div className="absolute inset-0 bg-gradient-to-br" />
          <div className="container relative mx-auto px-4">
            <h2 className="mb-20 text-center text-3xl  text-white md:text-4xl">
              利用者の声
            </h2>
            <div className="mx-auto max-w-4xl space-y-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    testimonial.position === "right" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="shrink-0">
                    <img
                      src={testimonial.imageSrc}
                      alt={testimonial.imageAlt}
                      className="h-24 md:h-28 w-auto  object-cover"
                    />
                  </div>
                  <div
                    className={`relative flex-1 rounded-3xl bg-gradient-to-r p-6 text-white ${
                      testimonial.position === "right"
                        ? "from-red-900/50 to-purple-900/50"
                        : "from-blue-900/50 to-purple-900/50"
                    }`}
                  >
                    <p className="relative z-10 text-sm leading-relaxed md:text-lg">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <LocationTimeHeader /> {/* コンポーネント */}
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
    </main>
  );
}
