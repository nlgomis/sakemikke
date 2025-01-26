'use client';

import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext"; // Added Auth context
import SpinningRings from "@/app/components/SpinningRings";
import BackButton from "@/app/components/BackButton";
import Image from "next/image";
import { getResult } from "./getResult";

export default function WashokuQuiz() {
    const router = useRouter();
    const { t } = useLanguage();
    const { user } = useAuth(); // Added user from Auth context
    const [state, setState] = useState({
        currentQuestion: 0,
        answers: {},
        subQuestions: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Added submitting state

    const [buttonAnimations, setButtonAnimations] = useState([]);
    const [visibleOptions, setVisibleOptions] = useState([]);
    const [allOptionsVisible, setAllOptionsVisible] = useState(false);

    const categoryImages = {
        刺身: "/images/sashimi.png",
        椀盛: "/images/soup.png",
        焼き魚: "/images/grilled-fish.png",
        揚げ物: "/images/fried-dishes.png",
        鍋: "/images/hot-pot.png",
    };

    const subCategoryImages = {
        ブリ: "/images/sashimi-buri.png",
        サーモン: "/images/sashimi-salmon.png",
        タイ: "/images/sashimi-seabream.png",
        潮仕立て: "/images/clear-soup.png",
        白味噌仕立て: "/images/white-miso.png",
        八丁味噌仕立て: "/images/red-miso.png",
        サバの塩焼き: "/images/saba.png",
        ブリの照り焼き: "/images/buriyaki.png",
        鰆の西京焼き: "/images/sawara-withmiso.png",
        鶏の竜田揚げ: "/images/karaage.png",
        とんかつ: "/images/pork-cutlet.png",
        アナゴの天ぷら: "/images/tempura.png",
        寄せ鍋: "/images/yose-nabe.png",
        すき焼き: "/images/sukiyaki.png",
        ブリしゃぶ: "/images/buri-shabu.png",
    };

    useLayoutEffect(() => {
        setVisibleOptions([]);
        setAllOptionsVisible(false);

        const currentQ = getCurrentQuestion();
        const timer = currentQ.options.map((_, index) => {
            return setTimeout(() => {
                setVisibleOptions((prev) => [...prev, index]);
                if (index === currentQ.options.length - 1) {
                    setTimeout(() => setAllOptionsVisible(true), 300);
                }
            }, 300 * (index + 1));
        });

        return () => timer.forEach(clearTimeout);
    }, [state.currentQuestion]);

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

    useEffect(() => {
        if (state.answers.category) {
            setState((prev) => ({
                ...prev,
                subQuestions: getSubQuestions(state.answers.category),
            }));
        }
    }, [t, state.answers.category]);

    const saveQuizResult = async (result) => {
        try {
            const API_URL = process.env.NODE_ENV === 'production'
                ? 'https://backmikke.onrender.com/api/users/update-quizzes'
                : 'https://backmikke.onrender.com/api/users/update-quizzes';
    
            const response = await fetch(API_URL, {
                method: 'PUT',
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

        if (state.currentQuestion === 0) {
            newAnswers.category = answer;
            setState({
                currentQuestion: 1,
                answers: newAnswers,
                subQuestions: getSubQuestions(answer),
            });
        } else {
            newAnswers.specific = answer;
            if (user) {
                setIsSubmitting(true);
                try {
                    const result = getResult(newAnswers.category, answer);
                    await saveQuizResult(result);
                } catch (error) {
                    console.error('Failed to save quiz result:', error);
                } finally {
                    setIsSubmitting(false);
                }
            }
            router.push(`/quiz/washoku/result?c=${newAnswers.category}&s=${answer}`);
        }
    };


    const categories = [
        { value: "刺身", label: t.washoku.options.categories.sashimi },
        { value: "椀盛", label: t.washoku.options.categories.soup },
        { value: "焼き魚", label: t.washoku.options.categories.grilled },
        { value: "揚げ物", label: t.washoku.options.categories.fried },
        { value: "鍋", label: t.washoku.options.categories.nabe },
    ];

    const getSubQuestions = (category) => {
        const subQuestionsMap = {
            刺身: [
                { value: "ブリ", label: t.washoku.options.sashimi.buri },
                { value: "サーモン", label: t.washoku.options.sashimi.salmon },
                { value: "タイ", label: t.washoku.options.sashimi.seabream },
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

        return subQuestionsMap[category] || [];
    };

   
    const getCurrentQuestion = () => {
        if (state.currentQuestion === 0) {
            return {
                question: t.washoku.questions.category,
                options: categories,
                gradient: "from-violet-500 via-blue-500 to-teal-500",
                border: "border-white",
            };
        } else {
            return {
                question: t.washoku.questions[state.answers.category],
                options: state.subQuestions,
                gradient: "from-violet-500 via-blue-500 to-teal-500",
                border: "border-white",
            };
        }
    };

    const handleBack = () => {
        if (state.currentQuestion > 0) {
            const newAnswers = { ...state.answers };
            delete newAnswers.category;
            setState({
                currentQuestion: state.currentQuestion - 1,
                answers: newAnswers,
                subQuestions: null,
            });
        }
    };

    const currentQuestion = getCurrentQuestion();

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
                return `${baseStyle} grid-cols-2 lg:grid-cols-3  max-w-[220px] lg:max-h-[244px] sm:max-w-md lg:max-w-[537.6px] xl:max-w-2xl 2xl:max-w-3xl`;
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

    const getImageUrl = (optionValue) => {
        if (state.currentQuestion === 0) {
            return categoryImages[optionValue];
        } else {
            return subCategoryImages[optionValue];
        }
    };

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

                        <div className="h-2 bg-white w-[80%] sm:w-[90%] mx-auto rounded-full">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${currentQuestion.gradient}`}
                                style={{
                                    width: `${((state.currentQuestion + 1) / 2) * 100}%`,
                                }}
                            />
                        </div>
                    </div>

                    <div className={`${getContainerStyle(currentQuestion.options.length)} mx-auto`}>
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={option.value}
                                className={`
                                    aspect-square
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
                                            <Image
                                                src={getImageUrl(option.value)}
                                                alt={option.label}
                                                width={800}
                                                height={800}
                                                className="w-full h-full transition-all duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black rounded-full opacity-30 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-50" />
                                        </div>
                                    </div>

                                    <span className="
                                        relative 
                                        text-sm
                                        sm:text-lg
                                        text-center 
                                        transition-all 
                                        duration-300
                                        lg:opacity-0
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