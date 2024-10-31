import { useState } from "react";
import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';
import { User } from "lucide-react";

export default function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    const authOptions = [
        { name: t.auth.login.name, path: '/login' },
        { name: t.auth.register.name, path: '/register' },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/30"
                aria-label="member registration"  // アクセシビリティの改善
            >
                <User className="w-5 h-5 text-white" />
            </button>

            {isOpen && (
                <div className="absolute top-12 right-0 w-48 py-2 mt-2 bg-black/95 border border-white/30 rounded-lg shadow-xl">
                    {authOptions.map((option, index) => (  // インデックスをキーに使用
                        <Link
                            key={index}
                            href={option.path}
                            className="block w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {option.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
