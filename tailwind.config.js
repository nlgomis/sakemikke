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
                moveHorizontal: {
                    "0%": { transform: "translateX(-50%) translateY(-10%)" },
                    "50%": { transform: "translateX(50%) translateY(10%)" },
                    "100%": { transform: "translateX(-50%) translateY(-10%)" },
                },
            },
            backgroundImage: {
                "gradient-quiz":
                    "linear-gradient(to bottom right, var(--tw-gradient-stops))",
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
