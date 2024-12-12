"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Image from "next/image";
import BlobAnimation from "../components/BlobAnimation";

export default function QuizSelector() {
    const router = useRouter();
    const { t } = useLanguage();

    const quizOptions = [
        {
            id: "beginner",
            name: t.quiz.options.beginner.name,
            description: t.quiz.options.beginner.description,
            image: "/images/beginner.png",
            path: "/quiz/beginner",
        },
        {
            id: "taste",
            name: t.quiz.options.taste.name,
            description: t.quiz.options.taste.description,
            image: "/images/taste.png",
            path: "/quiz/taste",
        },
        {
            id: "food",
            name: t.quiz.options.food.name,
            description: t.quiz.options.food.description,
            image: "/images/japanese-cuisine.png",
            path: "/quiz/washoku",
        },
    ];

    return (
        <div className="min-h-screen h-screen relative">
            <main className="container sm:h-full w-full mx-auto flex flex-col items-center sm:justify-center px-4 pt-28 sm:pt-0 pb-16 lg:pb-0 relative">
                <div className="text-center mb-8 sm:mb-14">
                    <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-6 tracking-wider">
                        {t.quiz.title}
                    </h1>
                    <p className="text-sm xs:text-base sm:text-xl lg:text-2xl text-blue-100/90 font-light tracking-wide">
                        {t.quiz.subtitle}
                    </p>
                </div>

                <div className="grid  sm:grid-cols-3 gap-10 lg:gap-20 max-w-[250px] sm:max-w-[575px] md:max-w-[700px] lg:max-w-[950px] xl:max-w-[1000px] mx-auto">
                    {quizOptions.map((option) => (
                        <Link
                            key={option.id}
                            href={option.path}
                            className="group relative rounded-3xl aspect-square flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105"
                        >
                            {/* Content */}
                            <div className="z-10">
                                <div className="relative">
                                    <Image
                                        src={option.image}
                                        alt={option.name}
                                        width={400}
                                        height={400}
                                        className="mx-auto mb-6 object-contain rounded-lg w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px]  xl:w-[300px] xl:h-[300px] "
                                    />
                                    <BlobAnimation />
                                </div>
                                <p className="text-white text-sm md:text-lg">
                                    {option.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
