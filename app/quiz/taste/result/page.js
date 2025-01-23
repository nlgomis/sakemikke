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
import TwitterShareButton from "@/app/components/TwitterShareButton";
import ShoppingCartButton from "@/app/components/ShoppingCartButton";

export default function QuizResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [rawSakeData, setRawSakeData] = useState(null);
  const [sakeData, setSakeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const taste = searchParams.get("t");
  const mood = searchParams.get("m");
  const pairing = searchParams.get("p");

  const result = getResult(taste, mood, pairing);

  // Helper function to transform data with current language
  const transformData = (data) => {
    if (!data) return null;
    return {
      id: data.id,
      name: t.sake.names[data.name] || data.name,
      type: t.sake.types[data.type] || data.type,
      origin: t.sake.regions[data.region] || data.region,
      rice: t.sake.rice_types[data.riceType] || data.riceType,
      classificationGradient: data.classification,
      classification:
        t.sake.classification[data.classification] || data.classification,
      polishingRatio: `${data.polishingRate}%`,
      price:
        data.price === null || data.price === undefined
          ? t.sake.labels.priceTbd
          : `¥${data.price.toLocaleString()} (${
              data.volume || t.sake.labels.mlTbd
            })ml`,
      alcohol: `${data.alcoholContent}%`,
      sakeValue: data.sakeLevel,
      tastePosition: calculateTastePosition(data.classification),
      sakeGrade: data.sakeGrade,
    };
  };

  // Fetch data only once
  useEffect(() => {
    const fetchSakeData = async () => {
      try {
        const response = await fetch(
          `https://backmikke.onrender.com/api/sake/${result}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sake data");
        }
        const data = await response.json();
        setRawSakeData(data);
        setIsLoading(false);

        setTimeout(() => {
          setShowContent(true);
        }, 2000);
      } catch (error) {
        console.error("Error fetching sake data:", error);
        setRawSakeData(getFallbackRawData());
        setIsLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 2000);
      }
    };

    fetchSakeData();
  }, [result]);

  // Transform data whenever language changes or raw data updates
  useEffect(() => {
    if (rawSakeData) {
      setSakeData(transformData(rawSakeData));
    }
  }, [t, rawSakeData]); // Dependencies include both language context and raw data

  const calculateTastePosition = (classification) => {
    const positions = {
      淡麗辛口: { x: 80, y: 20 }, // Light and dry
      淡麗甘口: { x: 20, y: 20 }, // Light and sweet
      濃醇辛口: { x: 80, y: 80 }, // Rich and dry
      濃醇甘口: { x: 20, y: 80 }, // Rich and sweet
    };
    return positions[classification] || { x: 50, y: 50 }; // Default to center if unknown
  };

  const getFallbackRawData = () => ({
    id: "default",
    name: "日本酒",
    type: "日本酒",
    region: "日本",
    riceType: "国産米",
    classification: "普通酒",
    polishingRate: "60",
    price: null,
    volume: null,
    alcoholContent: "15",
    sakeLevel: 50,
    sakeGrade: {
      body: 50,
      fragrance: 50,
      acidity: 50,
      clarity: 50,
    },
  });

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

  if (isLoading || !showContent || !sakeData) {
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
            <h2 className="text-xl md:text-2xl mb-4">{t.taste.result.title}</h2>
            <div
              className={`inline-block bg-gradient-to-r ${getGradient(
                sakeData.classificationGradient
              )} backdrop-blur-sm rounded-xl px-2 lg:px-6 py-3 lg:ml-44`}
            >
              <h2 className="text-2xl md:text-4xl font-medium">
                {sakeData.name}
                <span className="ml-2 text-lg md:text-2xl">
                  {t.taste.result.subtitle}
                </span>
              </h2>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr] 2xl:grid-cols-[1fr_2fr_1fr] sm:grid-rows-[auto_auto] lg:grid-rows-[auto] items-center gap-0">
            {/* Left Column - Details */}
            <div className="space-y-5 order-2 lg:order-1 mx-auto sm:mx-0 lg:sm:mx-auto mb-16 sm:mb-0">
              <div className="space-y-5 flex flex-col justify-between items-start w-sake-details sm:h-sake-details-sm lg:h-sake-details-lg 2xl:sake-details-2xl">
                {Object.entries({
                  [t.sake.labels.type]: sakeData.type,
                  [t.sake.labels.origin]: sakeData.origin,
                  [t.sake.labels.rice]: sakeData.rice,
                  [t.sake.labels.polishingRatio]: sakeData.polishingRatio,
                  [t.sake.labels.price]: sakeData.price,
                }).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-lg border-b border-white/80 pb-2 leading-9 lg:leading-10">
                      {key === t.sake.labels.polishingRatio ? (
                        <>
                          <span className="text-sm">{key}</span>
                          <Tooltip
                            text={t.sake.labels.tooltipPolishingRatio}
                            position="top"
                          >
                            <sup className="cursor-help px-[5.5px] py-px border-2 rounded-full text-[9px]">
                              ?
                            </sup>
                          </Tooltip>
                          &nbsp;:&nbsp;{value}
                        </>
                      ) : (
                        <>
                          <span className="text-sm">{key}</span>
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
                  className="object-contain max-h-[460px] sm:max-h-[380px] lg:max-h-[470px] 2xl:max-h-[600px] w-auto mx-auto"
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

          {/* Buttons Wrapper */}
          <div className="relative w-full mt-10  sm:mt-16 lg:mt-0 mb-6">
            {/* Try Again Button */}
            <div className="flex justify-center">
              <AgainButton onClick={() => router.push("/quiz")}>
                {t.taste.result.tryAgain}
              </AgainButton>
            </div>
            {/* Share Buttons */}
            <div
              className="absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-[calc(50%+140px)] flex gap-3
        /* スマホサイズでの調整 */
        position-center mt-4 sm:mt-0
        top-full left-1/2 -translate-x-1/2 sm:translate-x-0
    "
            >
             <ShoppingCartButton sake={sake} />
              <TwitterShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
                result={sakeData.name}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-5 pt-10 sm:py-6 text-center text-white">
        <p className="text-xs sm:text-sm font-light tracking-wider px-4">
          {t.home.copyright}
        </p>
      </footer>
    </div>
  );
}
