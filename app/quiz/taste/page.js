"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import SpinningRings from "@/app/components/SpinniongRings";
import GradientBackground from "@/app/components/GradientbBackground";
import MobileLayout from "@/app/components/MobileLayout";

export default function TasteQuiz() {
    const router = useRouter();
    const { t } = useLanguage();
    const [state, setState] = useState({
        currentQuestion: 0,
        answers: {},
    });

    const [buttonAnimations, setButtonAnimations] = useState([]);

    const questions = [
        {
            question: t.taste.questions.taste,
            gradient: "from-purple-500/20 to-blue-500/20",
            border: "border-white",
            options: [
                { value: "キレ", label: t.taste.options.tastes.kire },
                { value: "フルーティー", label: t.taste.options.tastes.fruity },
                { value: "甘口", label: t.taste.options.tastes.sweet },
                { value: "辛口", label: t.taste.options.tastes.dry },
            ],
        },
        {
            question: t.taste.questions.mood,
            gradient: "from-blue-500/20 to-teal-500/20",
            border: "border-white",
            options: [
                { value: "さわやか", label: t.taste.options.moods.refreshing },
                { value: "滑らか", label: t.taste.options.moods.smooth },
                { value: "重たい", label: t.taste.options.moods.heavy },
                { value: "華やか", label: t.taste.options.moods.elegant },
            ],
        },
        {
            question: t.taste.questions.pairing,
            gradient: "from-teal-500/20 to-emerald-500/20",
            border: "border-white",
            options: [
                { value: "洋食", label: t.taste.options.pairings.western },
                { value: "和食", label: t.taste.options.pairings.japanese },
                { value: "デザート", label: t.taste.options.pairings.dessert },
                { value: "単体", label: t.taste.options.pairings.alone },
            ],
        },
    ];

    useEffect(() => {
        const animations = [
            "animate-float-1",
            "animate-float-2",
            "animate-float-3",
            "animate-float-4",
            "animate-float-5",
            "animate-float-6",
            "animate-float-7",
            "animate-float-8",
        ];

        const shuffledAnimations = [...animations]
            .sort(() => Math.random() - 0.5)
            .slice(0, questions[state.currentQuestion].options.length);

        setButtonAnimations(shuffledAnimations);
    }, [state.currentQuestion]);

    

    const handleAnswer = (answer) => {
        const newAnswers = { ...state.answers };

        switch (state.currentQuestion) {
            case 0:
                newAnswers.taste = answer;
                break;
            case 1:
                newAnswers.mood = answer;
                break;
            case 2:
                newAnswers.pairing = answer;
                break;
        }

        const newState = {
            currentQuestion: state.currentQuestion + 1,
            answers: newAnswers,
        };

        if (state.currentQuestion === 2) {
            router.push(
                `/quiz/taste/result?t=${newAnswers.taste}&m=${newAnswers.mood}&p=${newAnswers.pairing}`
            );
        } else {
            setState(newState);
        }
    };

    const currentQuestion = questions[state.currentQuestion];

    const getOffsetClass = (index, optionsLength) => {
        if (optionsLength === 5) {
            return index === 1 || index === 3 ? "lg:translate-y-36" : "";
        } else if (optionsLength === 4) {
            return index === 1 || index === 3 ? "lg:translate-y-36" : "";
        } else if (optionsLength === 3) {
            return index === 1 ? "lg:translate-y-36" : "";
        } else if (optionsLength === 2) {
            return index === 1 ? "lg:translate-y-36" : "";
        }
        return "";
    };

    const getContainerStyle = (optionsLength) => {
        switch (optionsLength) {
            case 2:
                return "grid grid-cols-2 place-items-center gap-6 sm:gap-12 max-w-3xl";
            case 3:
                return "grid grid-cols-2 place-items-center lg:grid-cols-3 gap-6 sm:gap-12 max-w-3xl lg:max-w-4xl [&>*:last-child]:col-span-2 [&>*:last-child]:lg:col-span-1 [&>*:last-child]:mx-auto";
            case 4:
                return "grid grid-cols-2 lg:grid-cols-4 place-items-center gap-6 sm:gap-12 lg:gap-24 max-w-2xl lg:max-w-5xl";
            case 5:
                return "grid grid-cols-2 lg:grid-cols-5 place-items-center gap-6 sm:gap-12 lg:gap-24 max-w-2xl lg:max-w-6xl";
            default:
                return "grid grid-cols-1 place-items-center gap-6 sm:gap-12 max-w-2xl lg:max-w-5xl";
        }
    };

    const customRings = [
        {
            color: "#fff",
            bgOpacity: 0.05,
            bgColor: "#fff",
            width: "100%",
            height: "90%",
            animation: "animate-spin-custom1",
        },
        {
            color: "#fff",
            bgOpacity: 0.05,
            bgColor: "#ffffff",
            width: "90%",
            height: "100%",
            animation: "animate-spin-custom2",
        },
        {
            color: "#fff",
            bgOpacity: 0.05,
            bgColor: "#fff",
            width: "105%",
            height: "95%",
            animation: "animate-spin-custom3",
        },
        {
            color: "#fff",
            bgOpacity: 0.05,
            bgColor: "#fff",
            width: "95%",
            height: "105%",
            animation: "animate-spin-custom4",
        },
    ];

    return (
        <div className="min-h-screen text-white flex flex-col">
            <GradientBackground />
            <main className="flex-1 flex flex-col items-center lg:justify-center px-4 pt-40 lg:pt-0">
                <div className="w-full mx-auto space-y-12">
                    <div className="text-center mx-auto space-y-8 max-w-2xl">
                        <div className="p-8 rounded-2xl">
                            <h2 className="text-3xl font-light tracking-wider">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        <div className="h-2 bg-white/10 rounded-full">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${currentQuestion.gradient}`}
                                style={{
                                    width: `${
                                        ((state.currentQuestion + 1) /
                                            questions.length) * 100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>


                    {/* Options Section */}
                    <MobileLayout currentQuestion={currentQuestion} handleAnswer={handleAnswer} />
                    <div
                        className={`${getContainerStyle(
                            currentQuestion.options.length
                        )} mx-auto w-full hidden lg:grid`}
                    >
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={option.value}
                                className={`w-36 h-36 sm:w-48 sm:h-48 lg:w-60 lg:h-60 flex-shrink-0 transition-all duration-300 hover:scale-105 ${getOffsetClass(
                                    index,
                                    currentQuestion.options.length
                                )}`}
                            >
                                <button
                                    onClick={() => handleAnswer(option.value)}
                                    className={`
                                        relative
                                        w-full
                                        h-full
                                        rounded-full
                                        flex flex-col items-center justify-center
                                        p-4 space-y-2
                                        text-lg font-light tracking-wide
                                        group
                                        ${buttonAnimations[index] || ""}
                                    `}
                                >
                                    <SpinningRings rings={customRings} />
                                    <span className="text-center z-10">
                                        {option.label}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}