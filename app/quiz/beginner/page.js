"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import SpinningRings from "@/app/components/SpinniongRings";
import GradientBackground from "@/app/components/GradientbBackground";
import MobileLayout from "@/app/components/MobileLayout";

export default function BeginnerQuiz() {
    const router = useRouter();
    const { t } = useLanguage();
    const [state, setState] = useState({
        currentQuestion: 0,
        answers: {},
    });

    const [buttonAnimations, setButtonAnimations] = useState([]);

    const questions = [
        {
            question: t.beginner.questions.drink,
            gradient: "from-purple-500 to-blue-500",
            border: "border-white",
            options: [
                {
                    value: "ワイン",
                    label: t.beginner.options.drinks.wine,
                    style: "w-40 h-40 lg:w-56 lg:h-56 translate-x-12 -translate-y-32 rotate-6 top-0",
                },
                {
                    value: "ビール",
                    label: t.beginner.options.drinks.beer,
                    style: "w-40 h-40 lg:w-56 lg:h-56 translate-x-4 translate-y-8 -rotate-3 mt-16",
                },
                {
                    value: "ハイボール",
                    label: t.beginner.options.drinks.highball,
                    style: "w-40 h-40 lg:w-56 lg:h-56 -translate-x-1 -translate-y-28 rotate-12 ml-8 top-0",
                },
                {
                    value: "飲まない",
                    label: t.beginner.options.drinks.none,
                    style: "w-40 h-40 lg:w-56 lg:h-56 -translate-x-12 translate-y-8 -rotate-6 mr-12",
                },
            ],
            containerStyle:
                "relative h-[32rem] flex items-center justify-center max-w-5xl mx-auto",
        },
        {
            question: t.beginner.questions.concern,
            gradient: "from-blue-500 to-teal-500",
            border: "border-white",
            options: [
                {
                    value: "甘い感じ",
                    label: t.beginner.options.concerns.sweet,
                    style: "w-40 h-40 lg:w-56 lg:h-56 -translate-x-20 -translate-y-4 rotate-12 absolute left-1/4 top-0",
                },
                {
                    value: "辛口",
                    label: t.beginner.options.concerns.dry,
                    style: "w-40 h-40 lg:w-56 lg:h-56 translate-x-16 -translate-y-4 -rotate-6 absolute right-1/4 top-0 bottom-1/3",
                },
                {
                    value: "お酒感",
                    label: t.beginner.options.concerns.alcohol,
                    style: "w-40 h-40 lg:w-56 lg:h-56 -translate-x-4 -translate-y-20 rotate-3 absolute left-1/3 bottom-1/4",
                },
            ],
            containerStyle: "relative h-[32rem] max-w-4xl mx-auto",
        },
        {
            question: t.beginner.questions.occasion,
            gradient: "from-teal-500 to-emerald-500",
            border: "border-white",
            options: [
                {
                    value: "リラックス時",
                    label: t.beginner.options.occasions.relax,
                    style: "w-40 h-40 lg:w-56 lg:h-56 translate-x-24 -translate-y-6 rotate-12 absolute left-0 top-0",
                },
                {
                    value: "食事と一緒に",
                    label: t.beginner.options.occasions.food,
                    style: "w-40 h-40 lg:w-56 lg:h-56 translate-x-20 translate-y-20 -rotate-6 absolute right-1/4 top-0",
                },
            ],
            containerStyle: "relative h-[32rem] max-w-4xl mx-auto",
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
                newAnswers.drink = answer;
                break;
            case 1:
                newAnswers.concern = answer;
                break;
            case 2:
                newAnswers.occasion = answer;
                break;
        }

        const newState = {
            currentQuestion: state.currentQuestion + 1,
            answers: newAnswers,
        };

        if (state.currentQuestion === 2) {
            router.push(
                `/quiz/beginner/result?d=${newAnswers.drink}&c=${newAnswers.concern}&o=${newAnswers.occasion}`
            );
        } else {
            setState(newState);
        }
    };

    const handleBack = () => {
        if (state.currentQuestion > 0) {
            const newAnswers = { ...state.answers };
            // 現在の質問に対応する回答を削除
            switch (state.currentQuestion - 1) {
                case 0:
                    delete newAnswers.drink;
                    break;
                case 1:
                    delete newAnswers.concern;
                    break;
                case 2:
                    delete newAnswers.occasion;
                    break;
            }
            setState({
                currentQuestion: state.currentQuestion - 1,
                answers: newAnswers,
            });
        }
    };

    const currentQuestion = questions[state.currentQuestion];

    const getOffsetClass = (index, optionsLength) => {
        if (optionsLength === 5) {
            return index === 1 || index === 3 ? "translate-y-1/2" : "";
        } else if (optionsLength === 4) {
            return index === 1 || index === 3 ? "translate-y-1/2" : "";
        } else if (optionsLength === 3) {
            return index === 1 ? "translate-y-1/2" : "";
        } else if (optionsLength === 2) {
            return index === 1 ? "translate-y-1/2" : "";
        }
        return "";
    };

    // 選択肢の数に応じてコンテナのスタイルを決定する関数
    const getContainerStyle = (optionsLength) => {
        const baseStyle = "grid gap-6 lg:gap-0 xl:gap-4 w-full";
        switch (optionsLength) {
            case 2:
                return `${baseStyle} grid-cols-2  lg:grid-cols-2  max-w-[300px] sm:max-w-md lg:max-w-sm xl:max-w-md 2xl:max-w-lg`;
            case 3:
                return `${baseStyle} grid-cols-2 lg:grid-cols-3  max-w-[300px] sm:max-w-md lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl`;
            case 4:
                return `${baseStyle} grid-cols-2 lg:grid-cols-4  max-w-[300px] sm:max-w-md lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl`;
            case 5:
                return `${baseStyle} grid-cols-2 lg:grid-cols-5 max-w-[300px] sm:max-w-md lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl`;
            default:
                return `${baseStyle} grid-cols-1 max-w-5xl`;
        }
    };

    const customRings = [
        {
            color: "#fff",
            bgOpacity: 0.05,
            bgColor: "#fffff",
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
            bgColor: "#ffffff",
            width: "105%",
            height: "95%",
            animation: "animate-spin-custom3",
        },
        {
            color: "#fff",
            bgOpacity: 0.05,
            bgColor: "#ffffff",
            width: "95%",
            height: "105%",
            animation: "animate-spin-custom4",
        },
    ];

    return (
        <div className="min-h-screen text-white flex flex-col">
            <GradientBackground />
            <main className="flex-1 flex flex-col items-center 2xl:justify-center px-4 pt-28 2xl:pt-0">
                <div className="w-full mx-auto space-y-12">
                    {/* Question Section */}
                    <div className="text-center mx-auto max-w-2xl">
                        <div className="p-8 rounded-2xl">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-wider">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        <div className="h-2 bg-white rounded-full">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${currentQuestion.gradient}`}
                                style={{
                                    width: `${
                                        ((state.currentQuestion + 1) /
                                            questions.length) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Options Section */}
                    <div
                        className={`${getContainerStyle(
                            currentQuestion.options.length
                        )} mx-auto`}
                    >
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={option.value}
                                className={`aspect-square w-full h-full  transition-all duration-300 hover:scale-105 ${getOffsetClass(
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
                                        transition-all duration-300 
                                        hover:scale-105
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

                    {/* BackButton */}
                    <div className="text-center pb-12 lg:pt-20 xl:pt-28 ">
                    {state.currentQuestion > 0 ? (
                            <button
                                onClick={handleBack}
                                className="border border-white px-4 py-2 translate-y-1/2 rounded-full hover:bg-opacity-20 transition-all duration-300"
                            >
                                ← 前の回答に戻る
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push('/quiz/')}
                                className="border border-white px-4 py-2 translate-y-1/2 rounded-full hover:bg-opacity-20 transition-all duration-300"
                            >
                                ← 診断選択ページに戻る
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
