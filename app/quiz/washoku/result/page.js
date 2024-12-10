// "use client";

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useLanguage } from '../../../contexts/LanguageContext';
// import { getResult } from '../getResult';

// export default function QuizResult() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { t } = useLanguage();

//   const category = searchParams.get('c');
//   const specific = searchParams.get('s');

//   const result = getResult(category, specific);

//   // Define gradient based on sake type
//   const getGradient = (sake) => {
//     switch(sake) {
//       case '獺祭':
//       case '獺祭 純米大吟醸 磨き三割九分':
//       case '獺祭 スパークリング':
//         return 'from-purple-500/20 to-blue-500/20';
//       case '久保田':
//       case '久保田 千寿 吟醸':
//       case '久保田 萬寿':
//       case '久保田 千寿':
//         return 'from-blue-500/20 to-teal-500/20';
//       case '黒龍':
//       case '黒龍 大吟醸':
//       case '黒龍 純米酒':
//         return 'from-teal-500/20 to-emerald-500/20';
//       case '八海山':
//       case '八海山 純米酒':
//         return 'from-blue-400/20 to-purple-500/20';
//       default:
//         return 'from-emerald-500/20 to-blue-500/20';
//     }
//   };

//   return (
//     <div className="min-h-screen text-white flex flex-col pb-16">
//       <main className="flex-1 flex flex-col items-center justify-center p-4">
//         <div className="max-w-2xl w-full text-center space-y-8">
//           {/* Decorative element */}
//           <div className="flex justify-center mb-8">
//             <div className="w-32 h-[1px] bg-white/20"></div>
//             <div className="w-2 h-2 rounded-full bg-white/20 -mt-[3px] mx-4"></div>
//             <div className="w-32 h-[1px] bg-white/20"></div>
//           </div>

//           {/* Main title */}
//           <h1 className="text-2xl font-light tracking-[0.25em] text-white/80">
//             {t.washoku.result.title}
//           </h1>

//           {/* Result card */}
//           <div className={`
//             p-12 rounded-2xl border border-white/10
//             bg-gradient-to-br ${getGradient(result)}
//             transform hover:scale-[1.01] transition-all duration-500
//           `}>
//             {/* Japanese result name */}
//             <div className="mb-6">
//               <h2 className="text-7xl font-light tracking-widest mb-4">
//                 {result}
//               </h2>
//               <div className="h-[1px] w-24 mx-auto bg-white/20"></div>
//             </div>

//             {/* Subtitle */}
//             <p className="text-xl text-white/80 font-light tracking-wider">
//               {t.washoku.result.subtitle}
//             </p>
//           </div>

//           {/* Bottom decorative lines */}
//           <div className="flex justify-center space-x-1 mb-8">
//             <div className="w-16 h-[1px] bg-white/10"></div>
//             <div className="w-4 h-[1px] bg-white/20"></div>
//             <div className="w-2 h-[1px] bg-white/30"></div>
//           </div>

//           {/* Action buttons */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
//             <button
//               onClick={() => router.push('/quiz/washoku')}
//               className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 
//                       border border-white/30 hover:border-white/50
//                       transition-all duration-300 text-lg font-light tracking-wider"
//             >
//               {t.washoku.result.tryAgain}
//             </button>
//             <button
//               onClick={() => router.push('/quiz')}
//               className="px-8 py-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20
//                       border border-blue-400/30 hover:border-blue-400/50
//                       transition-all duration-300 text-lg font-light tracking-wider"
//             >
//               {t.washoku.result.backToQuiz}
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Bottom decorative pattern */}
//       <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none 
//                     bg-gradient-to-t from-black to-transparent opacity-80">
//         <div className="absolute bottom-0 left-0 w-full h-px bg-white/5"></div>
//         <div className="absolute bottom-2 left-0 w-full h-px bg-white/5"></div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getResult } from "../getResult";
import Image from "next/image";
import AgainButton from "@/app/components/AgainButton";
import SakeMetrics from "@/app/components/SakeMetrics";
import SakeRadarChart from "@/app/components/SakeRadarChart";
import LoadingAnimation from "@/app/components/LoadingAnimation";
import Tooltip from "@/app/components/Tooltip";
import { useEffect, useState } from "react";

export default function QuizResult() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage();
    const [sakeData, setSakeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    const category = searchParams.get('c');
    const specific = searchParams.get('s');

    const result = getResult(category, specific);

    useEffect(() => {
        const fetchSakeData = async () => {
            try {
                const response = await fetch(
                    `https://sakemikke-server-d7f7dhdgabfaawa5.japaneast-01.azurewebsites.net/api/sake/${result}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch sake data");
                }
                const data = await response.json();

                // Transform API data to match component needs
                const transformedData = {
                    id: data.id,
                    type: data.type,
                    origin: data.region,
                    rice: data.riceType,
                    classification: data.classification,
                    polishingRatio: `${data.polishingRate}%`,
                    price: data.price === null || data.price === undefined 
                    ? '価格未定' : `¥${data.price.toLocaleString()} (${data.volume || 'ml未定'}ml)`,
                    alcohol: `${data.alcoholContent}%`,
                    sakeValue: data.sakeLevel || 50,
                    tastePosition: calculateTastePosition(data.classification),
                    sakeGrade: data.sakeGrade,
                };

                setSakeData(transformedData);
                setIsLoading(false);

                // Add 1 second delay before showing content
                setTimeout(() => {
                    setShowContent(true);
                }, 2000);
            } catch (error) {
                console.error("Error fetching sake data:", error);
                // Set fallback data in case of error
                console.error("Error fetching sake data:", error);
                setSakeData(getFallbackData());
                setIsLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 2000);
            }
        };

        fetchSakeData();
    }, [result]);

    // Helper function to calculate taste position based on classification
    const calculateTastePosition = (classification) => {
        const positions = {
            淡麗辛口: { x: 80, y: 20 }, // Light and dry
            淡麗甘口: { x: 20, y: 20 }, // Light and sweet
            濃醇辛口: { x: 80, y: 80 }, // Rich and dry
            濃醇甘口: { x: 20, y: 80 }, // Rich and sweet
        };
        return positions[classification] || { x: 50, y: 50 }; // Default to center if unknown
    };

    // Fallback data in case of API failure
    const getFallbackData = () => ({
        type: "日本酒",
        origin: "日本",
        rice: "国産米",
        polishingRatio: "60%",
        price: "価格未定",
        alcohol: "15%",
        sakeValue: 50,
        tastePosition: { x: 50, y: 50 },
        sakeGrade: {
            body: 50,
            fragrance: 50,
            acidity: 50,
            clarity: 50,
        },
    });

    // Keep existing gradient function
    const getGradient = (classification) => {
        const classificationGradients = {
            濃醇甘口: "from-red-500 via-red-300 to-transparent",
            淡麗甘口: "from-sky-600 via-sky-400 to-transparent",
            濃醇辛口: "from-[#9A210ECC] via-[#B8392680] to-transparent",
            淡麗辛口: "from-blue-600 via-blue-400 to-transparent",
        };

        return (
            classificationGradients[classification] ||
            "from-teal-800/80 to-transparent"
        );
    };

    if (isLoading || !showContent) {
        return (
            <div>
                <LoadingAnimation />
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white flex flex-col">
            <main className="w-full max-w-4xl lg:max-w-5xl 2xl:max-w-[1300px] mx-auto flex-1 flex flex-col items-center justify-center pt-28 px-4">
                <div className="flex flex-col items-center">
                    <div className="text-center lg:text-start">
                        <h2 className="text-xl md:text-2xl mb-4">
                            {t.taste.result.title}
                        </h2>
                        <div
                            className={`inline-block bg-gradient-to-r ${getGradient(
                                sakeData.classification
                            )} backdrop-blur-sm rounded-xl px-2 lg:px-6 py-3 lg:ml-44`}
                        >
                            <h2 className="text-2xl md:text-4xl font-medium">
                                「{result}」
                                <span className="text-lg md:text-2xl">
                                    {t.taste.result.subtitle}
                                </span>
                            </h2>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr] 2xl:grid-cols-[1fr_2fr_1fr] sm:grid-rows-[auto_auto] lg:grid-rows-[auto] items-center gap-0">
                        {/* Left Column - Details */}
                        <div className="space-y-5 order-2 lg:order-1 mx-auto sm:mx-0 lg:sm:mx-auto mb-16 sm:mb-0">
                            <div
                                className="space-y-5 flex flex-col justify-between items-start w-sake-details sm:h-sake-details-sm
                                md:h-sake-details-md lg:h-sake-details-lg 2xl:sake-details-2xl"
                            >
                                {Object.entries({
                                    種類: sakeData.type,
                                    産地: sakeData.origin,
                                    原料米: sakeData.rice,
                                    精米歩合: sakeData.polishingRatio,
                                    値段: sakeData.price,
                                }).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="text-lg border-b border-white/80 pb-2 leading-9 lg:leading-10">
                                            {key === "精米歩合" ? (
                                                <>
                                                    <span className="text-sm">
                                                        {key}
                                                    </span>
                                                    <Tooltip
                                                        text={`玄米を外側から削り残った割合を％で示したもの。\n高ければ高いほど白米の甘みが感じられる。`}
                                                        position="top"
                                                    >
                                                        <sup className="cursor-help px-[5.5px] py-[1px] border-2 rounded-full text-[9px]">
                                                            ?
                                                        </sup>
                                                    </Tooltip>
                                                    &nbsp;:&nbsp;{value}
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-sm">
                                                        {key}
                                                    </span>
                                                    &nbsp;:&nbsp;{value}
                                                </>
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Center Column - Sake Bottles */}
                        <div className="relative order-1 lg:order-2 sm:col-span-2 lg:col-span-1">
                            <div className="max-w-md lg:max-w-2xl mx-auto">
                                <Image
                                    src={`https://spheriart.s3.ap-northeast-1.amazonaws.com/${sakeData.id}.png`}
                                    alt="Sake Bottles"
                                    width={600}
                                    height={900}
                                    className="object-contain max-h-[460px] md:max-h-[380px]  lg:max-h-[520px] 2xl:max-h-[700px]"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Column - Charts */}
                        <div className="space-y-5 order-3 lg:order-3 flex flex-col justify-between mx-auto w-[250px]">
                            {/* Taste Chart */}
                            <SakeRadarChart sakeData={sakeData} />
                            {/* Meters */}
                            <SakeMetrics sakeData={sakeData} />
                        </div>
                    </div>

                    {/* Try Again Button */}
                    <div className="text-center mt-10 sm:mt-16 lg:mt-[-80px] z-30 mb-6  sm:mb-0">
                        <AgainButton onClick={() => router.push("/quiz")}>
                            {t.taste.result.tryAgain}
                        </AgainButton>
                    </div>
                </div>
            </main>

            <footer className="py-4 sm:py-6 text-center text-white mt-auto">
                <p className="text-xs sm:text-sm font-light tracking-wider px-4">
                    {t.home.copyright}
                </p>
            </footer>
        </div>
    );
}
