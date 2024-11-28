// app/page.js
"use client";

import Link from "next/link";
import { useLanguage } from "./contexts/LanguageContext";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Image from "next/image";
import HomeButton from "./components/HomeButton";
export default function Home() {
    const { t } = useLanguage();
    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Main Content */}
                <main className="flex-1 flex flex-col justify-center pt-32 2xl:pt-40 items-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-[90%] sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
                        {/* Logo Container */}
                        <div className="mb-6 sm:mb-8 2xl:mb-12">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={300}
                                height={300}
                                className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-contain mx-auto"
                                priority
                            />
                        </div>

                        {/* Subtitle */}
                        <p className=" text-lg sm:text-xl lg:text-2xl text-white font-light tracking-wide sm:tracking-[.40em] mb-8 sm:mb-12 2xl:mb-16 sm:px-4">
                            {t.home.subtitle}
                        </p>

                        {/* Buttons Container */}

                        <Link href="/quiz" className=" text-white">
                            <HomeButton>{t.home.startButton}</HomeButton>
                        </Link>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-4 sm:py-6 text-center text-white mt-auto">
                    <p className="text-xs sm:text-sm font-light tracking-wider px-4">
                        {t.home.copyright}
                    </p>
                </footer>
            </div>
        </div>
    );
}
