import React, { useEffect, useRef } from "react";

const GradientBackground = () => {
    const interBubbleRef = useRef(null);

    const gradients = [
        {
            color: "0, 37, 206", // 青
            top: "10%",
            left: "10%",
            width: "w-4/5",
            height: "h-4/5",
            animation: "animate-moveVertical",
            origin: "",
            opacity: "",
        },
        {
            color: "77, 53, 137", // 紫
            top: "10%",
            left: "10%",
            width: "w-4/5",
            height: "h-4/5",
            animation: "animate-moveInCircleReverse",
            origin: "origin-[-400px_center]",
            opacity: "",
        },
        {
            color: "186, 218, 255", // グレイブルー
            top: "calc(10%+200px)",
            left: "calc(10%-500px)",
            width: "w-4/5",
            height: "h-4/5",
            animation: "animate-moveInCircle",
            origin: "origin-[400px_center]",
            opacity: "",
        },
        {
            color: "0, 234, 255", // 水色
            top: "10%",
            left: "10%",
            width: "w-4/5",
            height: "h-4/5",
            animation: "animate-moveHorizontal",
            origin: "origin-[-200px_center]",
            opacity: "opacity-70",
        },
        {
            color: "0, 234, 255", // 水色
            top: "-30%",
            left: "-30%",
            width: "w-[160%]",
            height: "h-[160%]",
            animation: "animate-moveInCircle",
            origin: "origin-[-800px_200px]",
            opacity: "",
        },
    ];

    useEffect(() => {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        const interBubble = interBubbleRef.current;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;

            if (interBubble) {
                interBubble.style.transform = `translate(${Math.round(
                    curX
                )}px, ${Math.round(curY)}px)`;
            }

            requestAnimationFrame(move);
        }

        const handleMouseMove = (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);
        move();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed w-screen h-screen">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-8xl font-dongle opacity-80 select-none text-shadow"></div>

            <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[rgb(0,41,114)] via-[rgb(44,52,127)]  to-[rgb(64,47,126)]">
                <svg className="hidden">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur
                                in="SourceGraphic"
                                stdDeviation="10"
                                result="blur"
                            />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                                result="goo"
                            />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                <div className="w-full h-full filter-goo blur-[40px]">
                    {gradients.map((gradient, index) => (
                        <div
                            key={index}
                            className={`
                                absolute 
                                ${gradient.width} 
                                ${gradient.height} 
                                ${gradient.animation} 
                                ${gradient.origin} 
                                ${gradient.opacity}
                                mix-blend-hard-light
                            `}
                            style={{
                                top: gradient.top,
                                left: gradient.left,
                                background: `radial-gradient(circle at center, rgba(${gradient.color},0.8) 0, rgba(${gradient.color},0) 50%)`,
                            }}
                        />
                    ))}

                    {/* マウスの動きに合わせて動く色（紫） */}
                    <div
                        ref={interBubbleRef}
                        className="absolute w-full h-full top-[-50%] left-[-50%] bg-[radial-gradient(circle_at_center,rgba(140,100,255,0.8)_0,rgba(140,100,255,0)_50%)] mix-blend-hard-light opacity-70"
                    />
                </div>
            </div>
        </div>
    );
};

export default GradientBackground;
