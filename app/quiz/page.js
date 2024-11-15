// app/quiz/page.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import GradientBackground from "../components/GradientbBackground";
import SpinningRings from "../components/SpinniongRings";

export default function QuizSelector() {
    const router = useRouter();
    const { t } = useLanguage();

    const quizOptions = [
        {
            id: "beginner",
            name: t.quiz.options.beginner.name,
            description: t.quiz.options.beginner.description,
            path: "/quiz/beginner",
        },
        {
            id: "taste",
            name: t.quiz.options.taste.name,
            description: t.quiz.options.taste.description,
            path: "/quiz/taste",
        },
        {
            id: "food",
            name: t.quiz.options.food.name,
            description: t.quiz.options.food.description,
            path: "/quiz/washoku",
        },
    ];

    return (
        <div className="min-h-screen h-screen relative">
            <div className="absolute">
                <GradientBackground />
            </div>
            <main className="container h-full mx-auto flex flex-col items-center lg:justify-center px-4 pt-28 lg:pt-0 relative">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-light text-white mb-12 tracking-wider">
                        {t.quiz.title}
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100/90 font-light tracking-wide">
                        {t.quiz.subtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 max-w-full mx-auto ">
                    {quizOptions.map((option) => (
                        <Link
                            key={option.id}
                            href={option.path}
                            className={`
                                group relative
                                rounded-full p-4
                                flex
                                flex-col
                                justify-center
                                items-center
                                text-center
                                sm:min-h-[190px]
                                sm:min-w-[190px]
                                max-h-[190px]
                                max-w-[190px]
                                lg:max-h-[270px]
                                lg:max-w-[270px]
                                2xl:max-h-[300px]
                                2xl:max-w-[300px]
                                aspect-square
                                w-full
                                h-full
                                transition-all duration-500
                                hover:scale-[1.10]
                                mx-auto
                                
                            `}
                        >
                            <SpinningRings />
                            <div className=" flex flex-col items-center justify-center gap-12">
                                <div>
                                    <h2 className="text-3xl font-light text-white mb-4 tracking-wider">
                                        {option.name}
                                    </h2>
                                    <p className="text-blue-100/80 font-light tracking-wide">
                                        {option.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300">
                                    <span className="text-lg font-light tracking-wider">
                                        {t.quiz.startQuiz}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
