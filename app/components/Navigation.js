"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import AuthButton from "./AuthButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

export default function Navigation() {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // メディアクエリを監視してモバイルメニューを制御
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        // メディアクエリの変更を監視する関数
        const handleMediaQueryChange = (e) => {
            if (e.matches) {
                setIsOpen(false);
            }
        };

        // 初期チェック
        if (mediaQuery.matches) {
            setIsOpen(false);
        }

        // リスナーを追加
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // クリーンアップ
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    const navItems = [
        { name: t.navigation.quiz, path: "/quiz" },
        { name: t.navigation.types, path: "/sake-types" },
        { name: t.navigation.about, path: "/about" },
        { name: t.navigation.contact, path: "/contact" },
    ];

    return (
        <nav
            className={`
      fixed top-0 left-0 w-full z-50 
      transition-all duration-300 ease-in-out
      ${
          isOpen
              ? "bg-white/30 h-screen backdrop-blur-sm"
              : "bg-transparent h-28"
      }
    `}
        >
            {/* Background with blur and gradient - only on desktop */}
            <div className="absolute inset-0" />

            {/* Navigation content */}
            <div className="relative h-28 px-6 flex items-center justify-between">
                {/* Left side - Logo and Back button */}
                <div className="flex items-center h-20 space-x-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center w-24">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={65}
                            height={65}
                            className="object-contain"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-1 items-center justify-center">
                    <div className="flex item-center justify-between w-[600px]">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`relative py-2 group ${
                                    pathname === item.path
                                        ? "text-white"
                                        : "text-white/70"
                                }`}
                            >
                                <span className="text-lg font-light tracking-wider group-hover:text-white transition-colors duration-300">
                                    {item.name}
                                </span>
                                <div
                                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent 
                              opacity-0 transform scale-x-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300
                              origin-center"
                                ></div>
                                {pathname === item.path && (
                                    <div className="absolute -bottom-0 left-0 w-full h-px bg-white/50"></div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right side controls */}
                <div className="flex items-center justify-end space-x-4">
                    <AuthButton />
                    <LanguageSwitcher />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
              lg:hidden flex items-center justify-center w-10 h-10 rounded-full
              transition-all duration-300
              ${
                  isOpen
                      ? "bg-white/20 border-white/40 rotate-180"
                      : "bg-white/10 border-white/30 rotate-0"
              }
              border hover:bg-white/20
            `}
                    >
                        <div className="transition-transform duration-300">
                            {isOpen ? (
                                <X className="w-5 h-5 text-white" />
                            ) : (
                                <Menu className="w-5 h-5 text-white" />
                            )}
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`
          lg:hidden absolute w-full
          transition-all duration-300 ease-in-out
          ${
              isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
            >
                <div className="py-4 px-6 space-y-4">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`
                block py-3 px-4 rounded-lg 
                transition-all duration-300
                transform
                ${
                    isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                }
                transition-delay-${index * 50}
                ${
                    pathname === item.path
                        ? "bg-black/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                }
                text-base font-light tracking-wider
              `}
                            style={{
                                transitionDelay: `${index * 50}ms`,
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
