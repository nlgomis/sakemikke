import React from "react";

const MobileLayout = ({ currentQuestion, handleAnswer }) => {
    return (
        <div className="space-y-4 lg:hidden">
            {currentQuestion.options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`
                w-full p-6 rounded-xl
                bg-gradient-to-br ${currentQuestion.gradient} opacity-90
                hover:opacity-100
                border  ${currentQuestion.border} 
                transition-all duration-300 
                text-lg font-light tracking-wide
                flex items-center justify-between
                group hover:scale-[1.02]
        `}
                >
                    <span className="ml-2">{option.label}</span>
                    <svg
                        className="w-5 h-5 text-white opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            ))}
        </div>
    );
};

export default MobileLayout;
