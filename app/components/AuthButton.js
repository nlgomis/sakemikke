'use client';

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut } from "lucide-react";
import { useClickOutside } from '../hooks/useClickOutside';

export default function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, language } = useLanguage();
    const { user, logout } = useAuth();

    // Use the click outside hook
    const dropdownRef = useClickOutside(() => {
        setIsOpen(false);
    });

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const authenticatedOptions = user && user.name ? [
        { 
            name: `${t.user.mypage}`,
            path: '/profile',
            className: "text-green-400"
        },
        { 
            name: t.auth.logout.name,
            action: handleLogout,
            icon: <LogOut className="w-4 h-4 mr-2" />
        }
    ] : [];

    const unauthenticatedOptions = [
        { name: t.auth.login.name, path: '/login' },
        { name: t.auth.register.name, path: '/register' },
    ];

    const options = user && user.name ? authenticatedOptions : unauthenticatedOptions;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/30"
                aria-label={user && user.name ? "user menu" : "member registration"}
            >
                <User className="w-5 h-5 text-white" />
            </button>

            {isOpen && (
                <div className="absolute top-12 right-0 w-48 py-2 mt-2 backdrop-blur-xl bg-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.16)] border border-white/30 rounded-lg ">
                    {options.map((option, index) => (
                        option.path ? (
                            <Link
                                key={index}
                                href={option.path}
                                className="block w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-all duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {option.name}
                            </Link>
                        ) : (
                            <button
                                key={index}
                                className={`flex items-center w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-all duration-300 ${option.className || ''}`}
                                onClick={option.action}
                            >
                                {option.icon}
                                {option.name}
                            </button>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}