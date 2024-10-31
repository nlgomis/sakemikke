/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
    safelist: [
        "animate-float-1",
        "animate-float-2",
        "animate-float-3",
        "animate-float-4",
        "animate-float-5",
        "animate-float-6",
        "animate-float-7",
        "animate-float-8",
    ],
    theme: {
        extend: {
            animation: {
                fadeIn: "fadeIn 0.5s ease-in forwards",
                moveInCircle: "moveInCircle 40s linear infinite",
                moveInCircleReverse: "moveInCircle 20s reverse infinite",
                moveVertical: "moveVertical 30s ease infinite",
                moveHorizontal: "moveHorizontal 40s ease infinite",
                "float-1": "float1 8s ease-in-out infinite",
                "float-2": "float2 9s ease-in-out infinite",
                "float-3": "float3 10s ease-in-out infinite",
                "float-4": "float4 9.5s ease-in-out infinite",
                "float-5": "float5 8.5s ease-in-out infinite",
                "float-6": "float6 10.5s ease-in-out infinite",
                "float-7": "float7 9.2s ease-in-out infinite",
                "float-8": "float8 8.8s ease-in-out infinite",
                disco: 'disco 1.5s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                moveInCircle: {
                    "0%": { transform: "rotate(0deg)" },
                    "50%": { transform: "rotate(180deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                moveVertical: {
                    "0%": { transform: "translateY(-50%)" },
                    "50%": { transform: "translateY(50%)" },
                    "100%": { transform: "translateY(-50%)" },
                },
                moveInCircleReverse: {
                    "0%": { transform: "rotate(360deg)" },
                    "100%": { transform: "rotate(0deg)" },
                },
                moveHorizontal: {
                    "0%": { transform: "translateX(-50%) translateY(-10%)" },
                    "50%": { transform: "translateX(50%) translateY(10%)" },
                    "100%": { transform: "translateX(-50%) translateY(-10%)" },
                },
                float1: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": { transform: "translate(12px, -10px) rotate(1deg)" },
                    "66%": {
                        transform: "translate(-8px, -15px) rotate(-1deg)",
                    },
                },
                float2: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": {
                        transform: "translate(-10px, -12px) rotate(-1.2deg)",
                    },
                    "66%": {
                        transform: "translate(10px, -8px) rotate(1.2deg)",
                    },
                },
                float3: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": {
                        transform: "translate(15px, -12px) rotate(1.5deg)",
                    },
                    "66%": {
                        transform: "translate(-10px, -15px) rotate(-1.5deg)",
                    },
                },
                float4: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": {
                        transform: "translate(-12px, -14px) rotate(-1.3deg)",
                    },
                    "66%": {
                        transform: "translate(12px, -10px) rotate(1.3deg)",
                    },
                },
                float5: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": {
                        transform: "translate(10px, -15px) rotate(1.1deg)",
                    },
                    "66%": {
                        transform: "translate(-12px, -12px) rotate(-1.1deg)",
                    },
                },
                float6: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": {
                        transform: "translate(-15px, -10px) rotate(-1.4deg)",
                    },
                    "66%": {
                        transform: "translate(12px, -14px) rotate(1.4deg)",
                    },
                },
                float7: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": {
                        transform: "translate(12px, -12px) rotate(1.6deg)",
                    },
                    "66%": {
                        transform: "translate(-8px, -10px) rotate(-1.6deg)",
                    },
                },
                float8: {
                    "0%, 100%": {
                        transform: "translate(0px, 0px) rotate(0deg)",
                    },
                    "33%": {
                        transform: "translate(-10px, -12px) rotate(-1.2deg)",
                    },
                    "66%": {
                        transform: "translate(15px, -15px) rotate(1.2deg)",
                    },
                },

                disco: {
                    '0%': { transform: 'translateY(-50%) rotate(0deg)' },
                    '100%': { transform: 'translateY(-50%) rotate(360deg)' },
                },
            },
            backgroundImage: {
                "gradient-quiz":"linear-gradient(to bottom right, var(--tw-gradient-stops))",
                'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
            },
            colors: {
                quiz: {
                    primary: {
                        light: "rgba(147, 51, 234, 0.2)",
                        DEFAULT: "rgba(147, 51, 234, 0.3)",
                        dark: "rgba(147, 51, 234, 0.4)",
                    },
                    secondary: {
                        light: "rgba(59, 130, 246, 0.2)",
                        DEFAULT: "rgba(59, 130, 246, 0.3)",
                        dark: "rgba(59, 130, 246, 0.4)",
                    },
                },
            },
        },
    },
    plugins: [],
};
