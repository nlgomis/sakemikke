"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import SpinningRings from "@/app/components/SpinningRings";
import BackButton from "@/app/components/BackButton";
import { getResult } from "./getResult";

export default function TasteQuiz() {
    const router = useRouter();
    const { t } = useLanguage();
    const { user } = useAuth();
    const [state, setState] = useState({
        currentQuestion: 0,
        answers: {},
    });

    const [buttonAnimations, setButtonAnimations] = useState([]);
    const [visibleOptions, setVisibleOptions] = useState([]);
    const [allOptionsVisible, setAllOptionsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useLayoutEffect(() => {
        setVisibleOptions([]);
        setAllOptionsVisible(false);

        const timer = questions[state.currentQuestion].options.map(
            (_, index) => {
                return setTimeout(() => {
                    setVisibleOptions((prev) => [...prev, index]);

                    
                    if (index === questions[state.currentQuestion].options.length - 1) {


                        setTimeout(() => setAllOptionsVisible(true), 300);
                    }
                }, 300 * (index + 1));
            }
        );

        return () => timer.forEach(clearTimeout);
    }, [state.currentQuestion]);

    const questions = [
        {
            question: t.taste.questions.taste,
            gradient: "from-violet-500 via-blue-500 to-cyan-500",
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
            gradient: "from-violet-500 via-blue-500 to-cyan-500",
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
            gradient: "from-violet-500 via-blue-500 to-cyan-500",
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

    const saveQuizResult = async (result) => {
        try {
            const API_URL = process.env.NODE_ENV === 'production'
                ? 'https://backmikke.onrender.com/api/users/update-quizzes'
                : 'https://backmikke.onrender.com/api/users/update-quizzes';
    
            const response = await fetch(API_URL, {
                method: 'PUT',  // Changed from POST to PUT
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    quizResult: result
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to save quiz result');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error saving quiz result:', error);
            throw error;
        }
    };

    const handleAnswer = async (answer) => {
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

        if (state.currentQuestion === 2) {
            if (user) {
                setIsSubmitting(true);
                try {
                    const result = getResult(newAnswers.taste, newAnswers.mood, newAnswers.pairing);
                    await saveQuizResult(result);
                } catch (error) {
                    console.error('Failed to save quiz result:', error);
                } finally {
                    setIsSubmitting(false);
                }
            }
            
            router.push(
                `/quiz/taste/result?t=${newAnswers.taste}&m=${newAnswers.mood}&p=${newAnswers.pairing}`
            );
        } else {
            setState({
                currentQuestion: state.currentQuestion + 1,
                answers: newAnswers,
            });
        }
    };

    const handleBack = () => {
        if (state.currentQuestion > 0) {
            const newAnswers = { ...state.answers };
            switch (state.currentQuestion - 1) {
                case 0:
                    delete newAnswers.taste;
                    break;
                case 1:
                    delete newAnswers.mood;
                    break;
                case 2:
                    delete newAnswers.pairing;
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

    const getContainerStyle = (optionsLength) => {
        const baseStyle = "grid gap-6 lg:gap-0 xl:gap-4 w-full";
        switch (optionsLength) {
            case 2:
                return `${baseStyle} grid-cols-2  lg:grid-cols-2  max-w-[220px] lg:max-h-[244px] sm:max-w-md lg:max-w-sm xl:max-w-md 2xl:max-w-lg`;
            case 3:
                return `${baseStyle} grid-cols-2 lg:grid-cols-3  max-w-[220px] lg:max-h-[244px] sm:max-w-md lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl`;
            case 4:
                return `${baseStyle} grid-cols-2 lg:grid-cols-4  max-w-[220px] lg:max-h-[244px] sm:max-w-md lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl`;
            case 5:
                return `${baseStyle} grid-cols-2 lg:grid-cols-5 max-w-[220px] lg:max-h-[244px] sm:max-w-md lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl`;
            default:
                return `${baseStyle} grid-cols-1 max-w-5xl`;
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
            <main className="flex-1 flex flex-col items-center justify-center pt-16 3xs:pt-8 2xs:pt-0 xs:pt-16 px-4 lg:pt-0">
                <div className="w-full mx-auto flex flex-col justify-between lg:gap-12 h-[518px] sm:h-[870px] md:h-[880px] lg:h-[546px] xl:h-[584px] 2xl:h-[610px]">
                    <div className="text-center mx-auto w-full max-w-3xl">
                        <div className="p-8 rounded-2xl">
                            <h2 className="text-2xl lg:text-3xl font-light min-h-[calc(2em+1rem)] sm:min-h-full tracking-wider">
                                {currentQuestion.question}
                            </h2>
                        </div>


                        {/* Progress Bar */}
                        <div className="h-2  bg-white w-[80%] sm:w-[90%] mx-auto rounded-full">

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

                    <div className={`${getContainerStyle(currentQuestion.options.length)} mx-auto`}>
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={option.value}
                                className={`aspect-square
                                    w-full
                                    h-full
                                    transition-all
                                    duration-1000
                                    md:hover:scale-105
                                    ${getOffsetClass(index, currentQuestion.options.length)}
                                    ${visibleOptions.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                                `}
                            >
                                <button
                                    onClick={() => handleAnswer(option.value)}
                                    disabled={!allOptionsVisible || isSubmitting}
                                    className={`
                                        relative
                                        w-full
                                        h-full
                                        aspect-square
                                        rounded-full
                                        flex flex-col items-center justify-center
                                        p-4 
                                        text-lg font-light tracking-wide
                                        group
                                        ${buttonAnimations[index] || ""}

                                        ${!allOptionsVisible || isSubmitting ? "cursor-not-allowed" : ""}

                                    `}
                                >
                                    <SpinningRings rings={customRings} />
                                    <div className="absolute w-full h-full">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]">
                                            <div className="absolute inset-0 bg-black/50 rounded-full opacity-30 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-50" />
                                        </div>
                                    </div>

                                    <span className="
                                        relative 
                                        text-sm
                                        sm:text-lg
                                        text-center 
                                        transition-all 
                                        duration-300
                                        lg:group-hover:opacity-100
                                        lg:group-hover:text-white
                                        lg:group-hover:font-medium
                                        lg:group-hover:scale-105
                                        lg:group-hover:text-shadow
                                    ">
                                        {option.label}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex justify-center translate-y-3/4 lg:mt-20">
                        <BackButton
                            onClick={
                                state.currentQuestion > 0
                                    ? handleBack
                                    : () => router.push("/quiz/")
                            }
                        >
                            {t.quiz.back}
                        </BackButton>
                    </div>
                </div>
            </main>
        </div>
    );
}
