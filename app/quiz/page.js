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
            <main className="container h-full w-full mx-auto flex flex-col items-center sm:justify-center px-4 pt-28 sm:pt-0 relative">
                <div className="text-center mb-8 sm:mb-14">
                    <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-6 tracking-wider">
                        {t.quiz.title}
                    </h1>
                    <p className="text-sm xs:text-base sm:text-xl lg:text-2xl text-blue-100/90 font-light tracking-wide">
                        {t.quiz.subtitle}
                    </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 lg:gap-12 xl:gap-16  max-w-[175.5px] sm:max-w-[575px]  md:max-w-[636px]  lg:max-w-[745.5px] xl:max-w-[777.5px] mx-auto ">
                    {quizOptions.map((option) => (
                        <Link
                            key={option.id}
                            href={option.path}
                            className={`
                                group relative
                                p-4
                                flex
                                flex-col
                                justify-center
                                items-center
                                text-center
                                w-[145px]
                                h-[145px]
                                xs:w-full
                                xs:h-full
                                aspect-square
                                transition-all duration-300
                                md:hover:scale-105
                                mx-auto
                                
                            `}
                        >
                            <SpinningRings />
                            <div className=" flex flex-col items-center justify-center gap-12">
                                <div>
                                    {/* <h2 className="text-3xl font-light text-white mb-4 tracking-wider">
                                        {option.name}
                                        日本酒に興味がある
                                    </h2> */}
                                    <p className="text-blue-100/80 font-light text-sm md:text-base lg:text-lg tracking-wide">
                                        {option.description}
                                    </p>
                                </div>

                                {/* <div className="flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300">
                                    <span className="text-lg font-light tracking-wider">
                                        {t.quiz.startQuiz}
                                    </span>
                                </div> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
