"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import SpinningRings from "@/app/components/SpinniongRings";
import GradientBackground from "@/app/components/GradientbBackground";
import MobileLayout from "@/app/components/MobileLayout";

export default function WashokuQuiz() {
    const router = useRouter();
    const { t } = useLanguage();
    const [state, setState] = useState({
        currentQuestion: 0,
        answers: {},
        subQuestions: null,
    });

    const [buttonAnimations, setButtonAnimations] = useState([]);

    useEffect(() => {
        const currentQ = getCurrentQuestion();
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
            .slice(0, currentQ.options.length);

        setButtonAnimations(shuffledAnimations);
    }, [state.currentQuestion]);

    const categories = [
        { value: "刺身", label: t.washoku.options.categories.sashimi },
        { value: "椀盛", label: t.washoku.options.categories.soup },
        { value: "焼き魚", label: t.washoku.options.categories.grilled },
        { value: "揚げ物", label: t.washoku.options.categories.fried },
        { value: "鍋", label: t.washoku.options.categories.nabe },
    ];

    const subQuestions = {
        刺身: [
            { value: "ぶり", label: t.washoku.options.sashimi.buri },
            { value: "サーモン", label: t.washoku.options.sashimi.salmon },
            { value: "ヒラメ", label: t.washoku.options.sashimi.hirame },
        ],
        椀盛: [
            { value: "潮仕立て", label: t.washoku.options.soup.shio },
            { value: "白味噌仕立て", label: t.washoku.options.soup.white },
            { value: "八丁味噌仕立て", label: t.washoku.options.soup.hatcho },
        ],
        焼き魚: [
            { value: "サバの塩焼き", label: t.washoku.options.grilled.saba },
            { value: "ブリの照り焼き", label: t.washoku.options.grilled.buri },
            { value: "鰆の西京焼き", label: t.washoku.options.grilled.sawara },
        ],
        揚げ物: [
            { value: "鶏の竜田揚げ", label: t.washoku.options.fried.chicken },
            { value: "とんかつ", label: t.washoku.options.fried.pork },
            { value: "アナゴの天ぷら", label: t.washoku.options.fried.anago },
        ],
        鍋: [
            { value: "寄せ鍋", label: t.washoku.options.nabe.yose },
            { value: "すき焼き", label: t.washoku.options.nabe.sukiyaki },
            { value: "ブリしゃぶ", label: t.washoku.options.nabe.buri },
        ],
    };

    const handleAnswer = (answer) => {
        const newAnswers = { ...state.answers };

        if (state.currentQuestion === 0) {
            newAnswers.category = answer;
            setState({
                currentQuestion: 1,
                answers: newAnswers,
                subQuestions: subQuestions[answer],
            });
        } else {
            newAnswers.specific = answer;
            router.push(
                `/quiz/washoku/result?c=${newAnswers.category}&s=${answer}`
            );
        }
    };

    const getCurrentQuestion = () => {
        if (state.currentQuestion === 0) {
            return {
                question: t.washoku.questions.category,
                options: categories,
                gradient: "from-purple-500/20 to-blue-500/20",
                border: "border-white",
            };
        } else {
            return {
                question: t.washoku.questions[state.answers.category],
                options: state.subQuestions,
                gradient: "from-blue-500/20 to-teal-500/20",
                border: "border-white",
            };
        }
    };

    const currentQuestion = getCurrentQuestion();

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

    // 選択肢の数に応じてコンテナのスタイルを決定する関数
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
            <main className="flex-1 flex flex-col items-center lg:justify-center px-4 pt-28 lg:pt-0">
                <div className="w-full mx-auto space-y-12">
                    {/* Question Section */}
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
                                        ((state.currentQuestion + 1) / 2) * 100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Options Section */}
                    <MobileLayout  currentQuestion={currentQuestion} handleAnswer={handleAnswer}/>
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
                                    key={option.value}
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
