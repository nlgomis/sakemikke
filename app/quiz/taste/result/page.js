"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getResult } from "../getResult";
import Image from "next/image";
import AgainButton from "@/app/components/AgainButton";

export default function QuizResult() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage();

    const taste = searchParams.get("t");
    const mood = searchParams.get("m");
    const pairing = searchParams.get("p");

    const result = getResult(taste, mood, pairing);

    // Comprehensive sake data mapping
    const sakeDataMap = {
        "獺祭": {
            type: "獺祭 純米大吟醸",
            origin: "山口県",
            rice: "山田錦",
            polishingRatio: "50%",
            price: "¥3,300 (720ml)",
            alcohol: "16%",
            sakeValue: "60",
            tastePosition: { x: 30, y: 70 }, // More towards dry and rich
        },
        "久保田": {
            type: "久保田 千寿",
            origin: "新潟県",
            rice: "五百万石",
            polishingRatio: "65%",
            price: "¥2,750 (720ml)",
            alcohol: "15%",
            sakeValue: "50",
            tastePosition: { x: 50, y: 50 }, // Balanced
        },
        "黒龍": {
            type: "黒龍 大吟醸",
            origin: "福井県",
            rice: "五百万石",
            polishingRatio: "55%",
            price: "¥4,400 (720ml)",
            alcohol: "16%",
            sakeValue: "70",
            tastePosition: { x: 20, y: 80 }, // Very dry and rich
        },
        "八海山": {
            type: "八海山 純米吟醸",
            origin: "新潟県",
            rice: "五百万石",
            polishingRatio: "60%",
            price: "¥2,970 (720ml)",
            alcohol: "15%",
            sakeValue: "40",
            tastePosition: { x: 60, y: 40 }, // Slightly sweet and light
        },
        "松竹梅白壁蔵「澪」": {
            type: "松竹梅白壁蔵「澪」",
            origin: "京都府",
            rice: "国産米",
            polishingRatio: "65%",
            price: "¥1,225 (750ml)",
            alcohol: "5%",
            sakeValue: "70",
            tastePosition: { x: 70, y: 30 }, // Sweet and light
        }
    };

    // Use the result to get specific sake data, fallback to default if not found
    const sakeData = sakeDataMap[result] || sakeDataMap["松竹梅白壁蔵「澪」"];

    // Define gradient based on sake type
    // Define gradient based on sake type
    const getGradient = (sake) => {
      switch (sake) {
          case "獺祭":
          case "獺祭 純米大吟醸 磨き三割九分":
          case "獺祭 純米大吟醸 磨き二割三分":
          case "獺祭 純米大吟醸50":
          case "獺祭 純米大吟醸45":
              return "from-emerald-500/80 to-transparent";
          case "久保田":
          case "久保田 千寿":
          case "久保田 碧寿":
              return "from-blue-500/80 to-transparent";
          case "黒龍":
          case "黒龍 大吟醸":
          case "黒龍 純米吟醸":
          case "黒龍 しずく 純米大吟醸":
          case "黒龍 吟醸":
              return "from-violet-500/80 to-transparent";
          case "八海山":
          case "八海山 本醸造":
          case "八海山 特別本醸造":
          case "八海山 純米吟醸":
              return "from-pink-400/80 to-transparent";
          default:
              return "from-teal-800/80 to-transparent";
      }
  };

    return (
        <div className="min-h-screen text-white flex flex-col">
            <main className="w-full max-w-4xl 2xl:max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center pt-28 px-4 ">
                <div className="flex flex-col items-center">
                    <div className="text-center lg:text-start">
                        <h2 className="text-xl md:text-2xl mb-4">
                            {t.taste.result.title}
                        </h2>
                        <div className={`inline-block bg-gradient-to-r ${getGradient(result)} backdrop-blur-sm rounded-xl px-6 py-3 lg:ml-44`}>
                            <h2 className="text-2xl md:text-4xl font-medium">
                                「{result}」
                                <span className="text-lg md:text-2xl">
                                    {t.taste.result.subtitle}
                                </span>
                            </h2>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr]  sm:grid-rows-[auto_auto] lg:grid-rows-[auto] items-center gap-0">
                        {/* Left Column - Details */}
                        <div className="space-y-5 order-2 lg:order-1 mx-auto sm:mx-0 lg:sm:mx-auto mb-10 sm:mb-0">
                            <div className="space-y-5 flex flex-col justify-around items-start h-[250px] sm:h-[340px] 2xl:h-[424px]">
                                {Object.entries({
                                    種類: sakeData.type,
                                    産地: sakeData.origin,
                                    原料米: sakeData.rice,
                                    精米歩合: sakeData.polishingRatio,
                                    値段: sakeData.price,
                                }).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="text-base lg:text-lg border-b border-white/80 pb-2">
                                            {key} : {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Sake Bottles */}
                        <div className="relative order-1 lg:order-2 sm:col-span-2 lg:col-span-1">
                            <div className="max-w-md lg:max-w-2xl mx-auto">
                                <Image
                                    src="/images/img-products1.png"
                                    alt="Sake Bottles"
                                    width={600}
                                    height={900}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Taste Chart */}
                        <div className="space-y-5 order-3 lg:order-3 ">
                            <div className="relative aspect-square max-w-[300px] mx-auto mb-10 sm:mb-0">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-[1px] bg-white/40 rotate-90" />
                                    <div className="w-full h-[1px] bg-white/40 absolute" />
                                </div>
                                <div className="absolute inset-0">
                                    <div className="relative w-full h-full">
                                        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-base lg:text-lg whitespace-nowrap">
                                            すっきり・軽快
                                        </span>
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-base lg:text-lg whitespace-nowrap">
                                            しっかり・濃厚
                                        </span>
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-base lg:text-lg">
                                            甘さ
                                        </span>
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-base lg:text-lg">
                                            辛さ
                                        </span>
                                        {/* Taste Position Indicator */}
                                        <div
                                            className="absolute w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                left: `${sakeData.tastePosition.x}%`,
                                                top: `${sakeData.tastePosition.y}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Meters */}
                            <div className="space-y-4 mt-8">
                                <div className="mb-10 sm:mb-0">
                                    <div className="flex justify-between text-base lg:text-lg mb-2">
                                        <span>アルコール</span>
                                        <span>{sakeData.alcohol}</span>
                                    </div>
                                    <div className="h-2 bg-white/100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ 
                                                width: `${parseFloat(sakeData.alcohol)}%` 
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-base lg:text-lg mb-2">
                                        <span>日本酒度数</span>
                                        <span>{sakeData.sakeValue}</span>
                                    </div>
                                    <div className="relative h-2 bg-white rounded-full">
                                        <div 
                                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"
                                            style={{ 
                                                left: `${parseFloat(sakeData.sakeValue)}%` 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="text-center mt-10 sm:mt-16 lg:mt-[-80px] z-30 mb-4 sm:mb-0">
                        <AgainButton onClick={() => router.push("/quiz")}>
                            {t.taste.result.tryAgain}
                        </AgainButton>
                    </div>
                </div>
            </main>
            {/* Footer */}
            <footer className="py-4 sm:py-6 text-center text-white mt-auto">
                <p className="text-xs sm:text-sm font-light tracking-wider px-4">
                    {t.home.copyright}
                </p>
            </footer>
        </div>
    );
}