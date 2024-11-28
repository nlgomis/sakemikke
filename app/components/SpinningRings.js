import React from "react";

const SpinningRings = ({
    className,
    rings = [
        {
            color: "#FFF",
            bgOpacity: 0.05,
            bgColor: "#fff", // 直接カラーコードを使用
            width: "100%",
            height: "90%",
            animation: "animate-spin-custom1",
        },
        {
            color: "#FFF",
            bgOpacity: 0.05,
            bgColor: "#ffffff",
            width: "90%",
            height: "100%",
            animation: "animate-spin-custom2",
        },
        {
            color: "#FFF",
            bgOpacity: 0.05,
            bgColor: "#ffffff",
            width: "105%",
            height: "95%",
            animation: "animate-spin-custom3",
        },
        {
            color: "#FFF",
            bgOpacity: 0.05,
            bgColor: "#ffffff",
            width: "95%",
            height: "105%",
            animation: "animate-spin-custom4",
        },
    ],
}) => {
    return (
        <div
            className={`absolute inset-0 flex items-center justify-center ${className}`}
        >
            <div className="relative w-full h-full">
                {rings.map((ring, index) => {
                    // bgColorのRGBA値を計算
                    const bgRgbaColor = ring.bgColor
                        .replace(/^#/, "")
                        .match(/.{2}/g)
                        .map((x) => parseInt(x, 16));

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 m-auto rounded-full ${ring.animation} shadow-[0_0_10px_0_var(--tw-shadow-color),inset_0_0_10px_0_var(--tw-shadow-color)]`}
                            style={{
                                "--tw-shadow-color": ring.color,
                                width: ring.width,
                                height: ring.height,
                                background: `rgba(${bgRgbaColor[0]}, ${bgRgbaColor[1]}, ${bgRgbaColor[2]}, ${ring.bgOpacity})`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SpinningRings;