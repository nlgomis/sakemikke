"use client";

import { createContext, useContext, useState, useEffect } from "react";

const getGreeting = (language) => {
    const hour = new Date().getHours();

    if (language === "ja") {
        if (hour >= 5 && hour < 12) return "おはようございます、";
        if (hour >= 12 && hour < 17) return "こんにちは、";
        return "こんばんは、";
    } else {
        if (hour >= 5 && hour < 12) return "Good morning, ";
        if (hour >= 12 && hour < 17) return "Hello, ";
        return "Good evening, ";
    }
};

const translations = {
    en: {
        navigation: {
            quiz: "Quiz",
            types: "Types of Sake",
            about: "About",
            contact: "Contact",
        },
        user: {
            mypage: 'My Page',
            designer: 'Designer',
            director: 'Director',
            engineer: 'Engineer'

        
        },
        home: {
            title: "SAKEMIKKE",
            subtitle: "Find your favorite sake",
            startButton: "START",
            exploreButton: "Explore Sake",
            copyright: "© 2025 SAKEMIKKE. All rights reserved.",
        },
        auth: {
            greeting: getGreeting("en"),
            login: {
                name: "Login",
            },
            logout: {
                name: "Logout",
            },
            register: {
                name: "Sign up",
            },
        },
        quiz: {
            title: "Sake tailored to your tastes",
            subtitle: "Choose what suits your mood",
            back: "Previous Page",
            startQuiz: "Start",
            options: {
                beginner: {
                    name: "Beginner",
                    description: "Recommended for those new to sake",
                },
                taste: {
                    name: "Taste",
                    description:
                        "Discover sake that matches your taste preferences",
                },
                food: {
                    name: "Food Pairing",
                    description: "Perfect sake pairings for Japanese cuisine",
                },
            },
        },
        beginner: {
            questions: {
                drink: "What is your favorite drink?",
                concern: "What alcohol characteristics don't suit you?",
                occasion: "What occasion do you enjoy drinking?",
            },
            options: {
                drinks: {
                    wine: "Wine",
                    beer: "Beer",
                    highball: "Highball",
                    none: "Don't drink",
                },
                concerns: {
                    sweet: "Sweet taste",
                    dry: "Dry taste",
                    alcohol: "Alcohol content",
                },
                occasions: {
                    relax: "When relaxing",
                    food: "With meals",
                },
            },
            result: {
                title: "The perfect sake for you is",
                subtitle: "",
                tryAgain: "Try Another Quiz",
                backToQuiz: "Back to Quiz Selection",
            },
        },
        sake: {
            labels: {
                type: "Type",
                origin: "Origin",
                rice: "Rice Type",
                polishingRatio: "Polishing Ratio",
                price: "Price",
                tbd: "TBD",
                mlTbd: "ml TBD",
                priceTbd: "Price TBD",
                tooltipPolishingRatio: "The percentage of rice remaining after polishing. Higher polishing ratio results in a sweeter taste.",
                tooltipSMV: "Sake Meter Value (SMV) is a numerical value that measures the specific gravity of sake in relation to water. \n The more negative the number, the sweeter it tastes, while the more positive the number, the drier it tastes.",
                featured: "Featured Sake Collection",
title: "A curated selection of world-renowned sake. Your perfect sake is waiting to be discovered here.",
find: "Find Your Sake Now!",
polishing: "Polishing"
            },
            rice_types: {
                "山田錦": "Yamada Nishiki",
                "⼭⽥錦": "Yamada Nishiki",
                "五百万石": "Gohyakumangoku",
                "五百万⽯": "Gohyakumangoku",
                "美山錦": "Miyama Nishiki",
                "雄町": "Omachi",
                "愛山": "Aizan",
                "八反錦": "Hattan Nishiki",
                "出羽燦々": "Dewasansan",
                "ひだほまれ": "Hida Homare",
                "美郷錦": "Misato Nishiki",
                "国産米": "Domestic Rice",
                "兵庫県産「山田錦」": "Yamada Nishiki from Hyogo Prefecture",
                "兵庫県産 愛山": "Aizan from Hyogo Prefecture",
                "兵庫県三木市吉川町・特Ａ地区産「山田錦」": "Yamada Nishiki from Special A District, Yoshikawa, Miki City, Hyogo Prefecture",
                "兵庫縣産特Ａ地區山田錦": "Yamada Nishiki from Special A District, Hyogo Prefecture",
                "兵庫県特Ａ地区産山田錦": "Yamada Nishiki from Special A District, Hyogo Prefecture",
                "兵庫県東条産山田錦": "Yamada Nishiki from Tojo, Hyogo Prefecture",
                "兵庫県口吉川産特A山田錦": "Special A Yamada Nishiki from Kuchiyoshikawa, Hyogo Prefecture",
                "五百万石、他": "Gohyakumangoku and others",
                "五百万石、トドロキワセ、他": "Gohyakumangoku, Todorokiwase and others",
                "五百万石、こしいぶき、トドロキワセ他": "Gohyakumangoku, Koshiibuki, Todorokiwase and others",
                "兵庫県特A地区産山田錦100％": "100% Yamada Nishiki from Special A District, Hyogo Prefecture",
                "糸島産山田錦100%": "100% Yamada Nishiki from Itoshima",
                "兵庫産「山田錦」、新潟産「五百万石」": "Yamada Nishiki from Hyogo and Gohyakumangoku from Niigata",
                "五百万石、新潟県産米": "Gohyakumangoku and Niigata Prefecture Rice",
                "兵庫県特Ａ地区産山田錦100％使用": "100% Yamada Nishiki from Special A District, Hyogo Prefecture"
            },
            names: {
                // Dassai Series
                "獺祭 純米大吟醸45": "Dassai Junmai Daiginjo 45",
                "獺祭 純米大吟醸 磨き三割九分": "Dassai Junmai Daiginjo Migaki Sanwari Kyubu",
                "獺祭 純米大吟醸 磨き二割三分": "Dassai Junmai Daiginjo Migaki Niwari Sanbu",
                "獺祭 純米大吟醸 にごりスパークリング45": "Dassai Junmai Daiginjo Nigori Sparkling 45",
                
                // Sparklings
                "松竹梅白壁蔵「澪」": "Shochikubai Shirakabegura MIO",
                "発泡清酒 すず音": "Sparkling Sake Suzune",
                "梵 プレミアムスパークリング": "Born Premium Sparkling",
                
                // Kubota Series
                "久保田 萬寿 純米大吟醸": "Kubota Manju Junmai Daiginjo",
                "久保田 純米大吟醸": "Kubota Junmai Daiginjo",
                "久保田 千寿 吟醸": "Kubota Senju Ginjo",
                "久保田 碧寿": "Kubota Hekiju",
                
                // Juyondai Series
                "十四代 本丸 秘伝玉返し": "Juyondai Honmaru Hidentamakaeshi",
                "十四代 純米吟醸 龍泉": "Juyondai Junmai Ginjo Ryusen",
                
                // Born Series
                "梵‧超吟": "Born Chogin",
                
                // Mitsui no Kotobuki Series
                "三井の寿「大吟醸 寒乃蔵」": "Mitsui no Kotobuki Daiginjo Kannonokura",
                
                // Kamoshibito Kuheiji Series
                "醸し人九平次「EAU DU DÉSIR」": "Kamoshibito Kuheiji EAU DU DÉSIR",
                
                // Houhou Biden Series
                "鳳凰美田 純米吟醸 「Black Phoenix」": "Houhou Biden Junmai Ginjo Black Phoenix",
                
                // Hakkaisan Series
                "八海山 清酒": "Hakkaisan Seishu",
                "特別本醸造 八海山": "Hakkaisan Tokubetsu Honjozo",
                "純米吟醸 八海山 55%": "Hakkaisan Junmai Ginjo 55%",
                
                // Kokuryu Series
                "黒龍 純吟": "Kokuryu Jungin",
                "黒龍 大吟醸": "Kokuryu Daiginjo",
                "黒龍 しずく 純米大吟醸": "Kokuryu Shizuku Junmai Daiginjo",
                
                // Other Notable Sakes
                "春鹿 純米超辛口": "Harushika Junmai Chokarakuchi",
                "ほまれ麒麟 純米大吟醸": "Homare Kirin Junmai Daiginjo",
                "飛騨自慢鬼ころし本醸造": "Hida Jiman Onikoroshi Honjozo",
                "天狗舞 古古酒 純米大吟醸": "Tengumai Koshu Junmai Daiginjo",
                "天狗舞 山廃純米 ひやおろし": "Tengumai Yamahai Junmai Hiyaoroshi",
                "菊姫 山廃純米": "Kikuhime Yamahai Junmai"
            },
            types: {
                "純米大吟醸": "Junmai Daiginjo",
                "純米吟醸": "Junmai Ginjo",
                "大吟醸": "Daiginjo",
                "吟醸酒": "Ginjo",
                "純米酒": "Junmai",
                "本醸造": "Honjozo",
                "特別本醸造": "Tokubetsu Honjozo",
                "普通酒": "Futsushu",
                "日本酒（発泡性）": "Sparkling Sake"
            },
            taste_profile: {
                "やや甘め": "Slightly Sweet",
                "甘口": "Sweet",
                "辛口": "Dry",
                "やや辛め": "Slightly Dry"
            },
            classification: {
                "淡麗甘口": "Light and Sweet",
                "濃醇甘口": "Rich and Sweet",
                "淡麗辛口": "Light and Dry",
                "濃醇辛口": "Rich and Dry"
            },
            regions: {
                "山口県": "Yamaguchi Prefecture",
                "京都府": "Kyoto Prefecture",
                "宮城県": "Miyagi Prefecture",
                "新潟県": "Niigata Prefecture",
                "福井県": "Fukui Prefecture",
                "山形県": "Yamagata Prefecture",
                "福岡県": "Fukuoka Prefecture",
                "愛知県": "Aichi Prefecture",
                "栃木県": "Tochigi Prefecture",
                "兵庫県": "Hyogo Prefecture",
                "奈良県": "Nara Prefecture",
                "岐阜県高山市": "Takayama City, Gifu Prefecture",
                "石川県": "Ishikawa Prefecture"
            },
            regionsTypes: {
                "山口県": "Yamaguchi Prefecture",
                "京都府": "Kyoto Prefecture",
                "宮城県": "Miyagi Prefecture",
                "新潟県": "Niigata Prefecture",
                "福井県": "Fukui Prefecture",
                "山形県": "Yamagata Prefecture",
                "福岡県": "Fukuoka Prefecture",
                "愛知県": "Aichi Prefecture",
                "栃木県": "Tochigi Prefecture",
                "兵庫県": "Hyogo Prefecture",
                "奈良県": "Nara Prefecture",
                "岐阜県高山市": "Takayama City, Gifu Prefecture",
                "石川県": "Ishikawa Prefecture"
                
            },
            keywords: {
                "フルーティー": "Fruity",
                "華やか": "Elegant",
                "すっきり": "Clean",
                "上品": "Refined",
                "クリア": "Clear",
                "繊細": "Delicate",
                "軽快": "Light",
                "やさしい甘み": "Gentle Sweetness",
                "甘い": "Sweet",
                "スパークリング": "Sparkling",
                "芳醇": "Rich",
                "最高級": "Premium",
                "濃醇": "Full-bodied",
                "スッキリ": "Crisp",
                "キレ": "Sharp",
                "シャープ": "Sharp",
                "やわらか": "Smooth",
                "滑らか": "Silky",
                "爽やか": "Refreshing",
                "まろやか": "Mellow",
                "エレガント": "Elegant",
                "深みのある": "Deep",
                "穏やか": "Mild",
                "酸味": "Acidic",
                "コク": "Rich Body",
                "ふくよかな香り": "Full-bodied Aroma",
                "サラリとした": "Light & Smooth"
            },
            alcohol:{
                alcohol: "Alcohol",
                smv: "SMV"
            },
            characteristics: {
    
                fragrant: "fragrance",
                sharpness: "sharpness",
                rich: "richness",
                acidity: "acidity",
                
            },
            description: {
                "獺祭 純米大吟醸45": "A sake widely appreciated by both beginners and sake enthusiasts, particularly notable for its elegant aroma and clean finish. The subtle acidity and mild richness enhance its drinkability.",
                "獺祭 純米大吟醸 磨き三割九分": "Combines lightness and depth, with its fruity aroma particularly enhanced when served chilled.",
                "獺祭 純米大吟醸 磨き二割三分": "Made from rice polished to 23%, pairs well with white fish sashimi and lightly seasoned Japanese dishes. Perfect for special occasion toasts.",
                "松竹梅白壁蔵「澪」": "Fruity and light, with low alcohol content, making it popular among beginners and those who typically don't prefer sake.",
                "発泡清酒 すず音": "Named after the bell-like sound its delicate bubbles make when poured into a glass. Features a low 5% alcohol content with a sweet-tart, fruity flavor.",
                "久保田 萬寿 純米大吟醸": "Named with the meaning 'wishing longevity for all things,' featuring an easy-drinking mouthfeel and a rich yet fruity aroma.",
                "十四代 本丸 秘伝玉返し": "Known for its soft, gentle sweetness and mild muscat-like aroma, particularly praised for its drinkability among the Juyondai series.",
                "梵 プレミアムスパークリング": "A premium sparkling sake made from Yamada Nishi rice polished to 20% and aged for over a year at -10°C. Features elegant, deep aromas and ultra-fine bubbles in a slightly cloudy unpasteurized sake.",
                "三井の寿「大吟醸 寒乃蔵」": "Characterized by its elegant aroma and delicate taste, best enjoyed chilled. Pairs well with sashimi and lightly seasoned Japanese dishes.",
                "醸し人九平次「EAU DU DÉSIR」": "Pairs excellently with both French cuisine and delicate Japanese dishes, highly regarded as a food-pairing sake with its elegant, fruity aroma.",
                "梵‧超吟": "Aged for about 5 years at -10°C, featuring rich fruit aromas and a smooth, deep flavor. A jewel representing Japanese sake culture.",
                "十四代 純米吟醸 龍泉": "A rare sake from Takagi Brewery in Yamagata Prefecture, known for being particularly difficult to obtain. Features a smooth mouthfeel with fruity aromas and rich umami.",
                "鳳凰美田 純米吟醸 「Black Phoenix」": "A limited edition sake from Kobayashi Brewery in Tochigi Prefecture, using rare Aiyama sake rice from Hyogo Prefecture. Features rich acidity and a soft, mellow mouthfeel.",
                "久保田 純米大吟醸": "Pairs well with various dishes, particularly complementing Japanese cuisine and simply seasoned dishes.",
                "久保田 千寿 吟醸": "Features a mild aroma and crisp mouthfeel, a versatile dry sake that can be enjoyed both chilled or warm.",
                "八海山 清酒": "Crafted with food pairing in mind, offering a clean mouthfeel and crisp dry finish without any off-flavors.",
                "特別本醸造 八海山": "A signature sake from Hakkaisan Brewery in Niigata, featuring a soft mouthfeel and clean taste. Can be enjoyed both chilled or warm.",
                "純米吟醸 八海山 55%": "A junmai ginjo that perfectly balances crisp dryness with rice umami, offering versatile enjoyment across a wide range of temperatures.",
                "黒龍 純吟": "A junmai ginjo that brings out the natural umami of rice while pursuing a refreshing drinking experience. Characterized by a deep umami created by the harmony of taste and aroma.",
                "黒龍 大吟醸": "A popular daiginjo from Kokuryu Brewery in Fukui Prefecture, known for its full-bodied aroma, clear throat feel, and refreshing drinking experience.",
                "黒龍 しずく 純米大吟醸": "A daiginjo made from premium Yamada Nishi rice, carefully fermented at low temperatures. Features a crystal-clear taste with grapefruit and plum blossom aromas.",
                "獺祭 純米大吟醸 にごりスパークリング45": "Offers a harmonious blend of nigori sake's rice sweetness and refreshing carbonation, delivering a delicate yet distinctive taste.",
                "春鹿 純米超辛口": "Despite being super dry with a sake meter value of +12, features a light and mellow mouthfeel. Achieves a crisp taste using highly polished rice and hard brewing water.",
                "ほまれ麒麟 純米大吟醸": "Blends equal parts Hyogo Yamada Nishi and Niigata Gohyakumangoku rice, featuring elegant aroma, delicate umami, and smooth throat feel. Appreciated both chilled and warm.",
                "飛騨自慢鬼ころし本醸造": "A traditional dry sake from Ota Brewery in Takayama, Gifu Prefecture, dating back to mid-Edo period. Features a clean, proper mouthfeel with moderate umami in a light, dry style.",
                "久保田 碧寿": "Combines the depth and richness characteristic of yamahai brewing with Kubota's signature crispness. While excellent chilled, its umami particularly shines when served warm.",
                "天狗舞 古古酒 純米大吟醸": "Aged for over 2 years, developing mild aromas and complex flavors, resulting in an exceptionally smooth and well-balanced taste.",
                "天狗舞 山廃純米 ひやおろし": "A seasonal sake from Shata Brewery in Ishikawa Prefecture. Features a harmonious balance of acidity and umami characteristic of yamahai brewing, with a rich and crisp flavor profile.",
                "菊姫 山廃純米": "Released in 1983 as the first sake in the industry to be labeled as 'yamahai-jikomi'. Features the powerful acidity and rich umami characteristic of yamahai brewing, standing out as a distinctive 'masculine' sake that tends to elicit strong opinions."
            },
    },
        taste: {
            questions: {
                taste: "What flavor of sake are you looking for?",
                mood: "What kind of mood do you want to be in?",
                pairing: "What would you like to pair sake with?",
            },
            options: {
                tastes: {
                    kire: "Crisp",
                    fruity: "Fruity",
                    sweet: "Sweet",
                    dry: "Dry",
                },
                moods: {
                    refreshing: "Refreshing",
                    smooth: "Smooth",
                    heavy: "Rich",
                    elegant: "Elegant",
                },
                pairings: {
                    western: "Western Food",
                    japanese: "Japanese Food",
                    dessert: "Dessert",
                    alone: "By Itself",
                },
            },
            result: {
                title: "The perfect sake for you is",
                subtitle: "",
                tryAgain: "Try Another Match",
                backToQuiz: "Back to Quiz Selection",
            },
        },
        washoku: {
            questions: {
                category: "What kind of food do you like?",
                刺身: "Which sashimi do you prefer?",
                椀盛: "Which type of soup do you prefer?",
                焼き魚: "Which grilled fish do you prefer?",
                揚げ物: "Which fried dish do you prefer?",
                鍋: "Which hot pot dish do you prefer?",
            },
            options: {
                categories: {
                    sashimi: "Sashimi",
                    soup: "Soup",
                    grilled: "Grilled Fish",
                    fried: "Fried Dishes",
                    nabe: "Hot Pot",
                },
                sashimi: {
                    buri: "Yellowtail",
                    salmon: "Salmon",
                    seabream: "Sea bream",
                },
                soup: {
                    shio: "Clear Soup",
                    white: "White Miso Soup",
                    hatcho: "Hatcho Miso Soup",
                },
                grilled: {
                    saba: "Grilled Mackerel with Salt",
                    buri: "Yellowtail Teriyaki",
                    sawara: "Grilled Spanish Mackerel with Miso",
                },
                fried: {
                    chicken: "Fried Chicken Karaage",
                    pork: "Pork Cutlet",
                    anago: "Conger Eel Tempura",
                },
                nabe: {
                    yose: "Yose Nabe",
                    sukiyaki: "Sukiyaki",
                    buri: "Yellowtail Shabu-shabu",
                },
            },
            result: {
                title: "The perfect sake for you is",
                subtitle: "",
                tryAgain: "Try Another Pairing",
                backToQuiz: "Back to Quiz Selection",
            },
        },
    },
    ja: {
        navigation: {
            quiz: "診断",
            types: "日本酒一覧",
            about: "酒見っけとは",
            contact: "お問い合わせ",
        },
        user: {
            mypage: 'マイページ',
            designer: 'デザイナー',
            director: 'ディレクター',
            engineer: 'エンジニア'

        },
        home: {
            title: "酒みっけ",
            subtitle: "あなた好みの日本酒が見つかる。",
            startButton: "START",
            exploreButton: "日本酒を探る",
            copyright: "© 2025 SAKEMIKKE. All rights reserved.",
        },
        auth: {
            greeting: getGreeting("ja"),
            login: {
                name: "ログイン",
            },
            logout: {
                name: "ログアウト",
            },
            register: {
                name: "サインアップ",
            },
        },
        quiz: {
            title: "あなた好みに合わせた日本酒を。",
            subtitle: "今の気持ちにぴったりなものを選択",
            back: "前のページへ",
            startQuiz: "スタート",
            options: {
                beginner: {
                    name: "初心者",
                    description: "日本酒に興味がある",
                },
                taste: {
                    name: "味わい",
                    description: "味わいから選びたい方",
                },
                food: {
                    name: "和食",
                    description: "日本食に合わせたい",
                },
            },
        },
        sake: {
            labels: {
                type: "種類",
                origin: "産地",
                rice: "原料米",
                polishingRatio: "精米歩合",
                price: "値段",
                tbd: "未定",
                mlTbd: "ml未定",
                priceTbd: "価格未定",
                tooltipPolishingRatio: "玄米を外側から削り残った割合を％で示したもの。\n高ければ高いほど白米の甘みが感じられる。",
                tooltipSMV: "水に対する日本酒の比重を数値化したもの。\nマイナスの数字が大きいと甘口に、プラスの数字が大きいと辛口に感じる。",
                featured: "ピックアップ日本酒一覧",
                title: "世界的に名高い日本酒をピックアップ。あなたにぴったりの日本酒が、ここにあるはず。",
                find: "今すぐ酒みっけ！",
polishing: "精米"
            },
            characteristics: {
    
                fragrant: "華やかさ",
                sharpness: "キレ",
                rich: "コク",
                acidity: "酸味",
                
              },
              rice_types: {
                "山田錦": "山田錦",
                "⼭⽥錦": "⼭⽥錦",
                "五百万石": "五百万石",
                "五百万⽯": "五百万⽯",
                "美山錦": "美山錦",
                "雄町": "雄町",
                "愛山": "愛山",
                "八反錦": "八反錦",
                "出羽燦々": "出羽燦々",
                "ひだほまれ": "ひだほまれ",
                "美郷錦": "美郷錦",
                "国産米": "国産米",
                "兵庫県産「山田錦」": "兵庫県産「山田錦」",
                "兵庫県産 愛山": "兵庫県産 愛山",
                "兵庫県三木市吉川町・特Ａ地区産「山田錦」": "兵庫県三木市吉川町・特Ａ地区産「山田錦」",
                "兵庫縣産特Ａ地區山田錦": "兵庫縣産特Ａ地區山田錦",
                "兵庫県特Ａ地区産山田錦": "兵庫県特Ａ地区産山田錦",
                "兵庫県東条産山田錦": "兵庫県東条産山田錦",
                "兵庫県口吉川産特A山田錦": "兵庫県口吉川産特A山田錦",
                "五百万石、他": "五百万石、他",
                "五百万石、トドロキワセ、他": "五百万石、トドロキワセ、他",
                "五百万石、こしいぶき、トドロキワセ他": "五百万石、こしいぶき、トドロキワセ他",
                "兵庫県特A地区産山田錦100％": "兵庫県特A地区産山田錦100％",
                "糸島産山田錦100%": "糸島産山田錦100%",
                "兵庫産「山田錦」、新潟産「五百万石」": "兵庫産「山田錦」、新潟産「五百万石」",
                "五百万石、新潟県産米": "五百万石、新潟県産米",
                "兵庫県特Ａ地区産山田錦100％使用": "兵庫県特Ａ地区産山田錦100％使用"
            },
            names: {
                // Dassai Series
                "獺祭 純米大吟醸45": "獺祭 純米大吟醸45",
                "獺祭 純米大吟醸 磨き三割九分": "獺祭 純米大吟醸 磨き三割九分",
                "獺祭 純米大吟醸 磨き二割三分": "獺祭 純米大吟醸 磨き二割三分",
                "獺祭 純米大吟醸 にごりスパークリング45": "獺祭 純米大吟醸 にごりスパークリング45",
                
                // Sparklings
                "松竹梅白壁蔵「澪」": "松竹梅白壁蔵「澪」",
                "発泡清酒 すず音": "発泡清酒 すず音",
                "梵 プレミアムスパークリング": "梵 プレミアムスパークリング",
                
                // Kubota Series
                "久保田 萬寿 純米大吟醸": "久保田 萬寿 純米大吟醸",
                "久保田 純米大吟醸": "久保田 純米大吟醸",
                "久保田 千寿 吟醸": "久保田 千寿 吟醸",
                "久保田 碧寿": "久保田 碧寿",
                
                // Juyondai Series
                "十四代 本丸 秘伝玉返し": "十四代 本丸 秘伝玉返し",
                "十四代 純米吟醸 龍泉": "十四代 純米吟醸 龍泉",
                
                // Born Series
                "梵‧超吟": "梵‧超吟",
                
                // Mitsui no Kotobuki Series
                "三井の寿「大吟醸 寒乃蔵」": "三井の寿「大吟醸 寒乃蔵」",
                
                // Kamoshibito Kuheiji Series
                "醸し人九平次「EAU DU DÉSIR」": "醸し人九平次「EAU DU DÉSIR」",
                
                // Houhou Biden Series
                "鳳凰美田 純米吟醸 「Black Phoenix」": "鳳凰美田 純米吟醸 「Black Phoenix」",
                
                // Hakkaisan Series
                "八海山 清酒": "八海山 清酒",
                "特別本醸造 八海山": "特別本醸造 八海山",
                "純米吟醸 八海山 55%": "純米吟醸 八海山 55%",
                
                // Kokuryu Series
                "黒龍 純吟": "黒龍 純吟",
                "黒龍 大吟醸": "黒龍 大吟醸",
                "黒龍 しずく 純米大吟醸": "黒龍 しずく 純米大吟醸",
                
                // Other Notable Sakes
                "春鹿 純米超辛口": "春鹿 純米超辛口",
                "ほまれ麒麟 純米大吟醸": "ほまれ麒麟 純米大吟醸",
                "飛騨自慢鬼ころし本醸造": "飛騨自慢鬼ころし本醸造",
                "天狗舞 古古酒 純米大吟醸": "天狗舞 古古酒 純米大吟醸",
                "天狗舞 山廃純米 ひやおろし": "天狗舞 山廃純米 ひやおろし",
                "菊姫 山廃純米": "菊姫 山廃純米"
            },
            types: {
                "純米大吟醸": "純米大吟醸",
                "純米吟醸": "純米吟醸",
                "大吟醸": "大吟醸",
                "吟醸酒": "吟醸酒",
                "純米酒": "純米酒",
                "本醸造": "本醸造",
                "特別本醸造": "特別本醸造",
                "普通酒": "普通酒",
                "日本酒（発泡性）": "日本酒（発泡性）"
            },
            taste_profile: {
                "やや甘め": "やや甘め",
                "甘口": "甘口",
                "辛口": "辛口",
                "やや辛め": "やや辛め"
            },
            classification: {
                "淡麗甘口": "淡麗甘口",
                "濃醇甘口": "濃醇甘口",
                "淡麗辛口": "淡麗辛口",
                "濃醇辛口": "濃醇辛口"
            },
            regions: {
                "山口県": "山口県",
                "京都府": "京都府",
                "宮城県": "宮城県",
                "新潟県": "新潟県",
                "福井県": "福井県",
                "山形県": "山形県",
                "福岡県": "福岡県",
                "愛知県": "愛知県",
                "栃木県": "栃木県",
                "兵庫県": "兵庫県",
                "奈良県": "奈良県",
                "岐阜県高山市": "岐阜県高山市",
                "石川県": "石川県"
            },
            regionsTypes: {
                "山口県": "山口県産",
                "京都府": "京都府産",
                "宮城県": "宮城県産",
                "新潟県": "新潟県産",
                "福井県": "福井県産",
                "山形県": "山形県産",
                "福岡県": "福岡県産",
                "愛知県": "愛知県産",
                "栃木県": "栃木県産",
                "兵庫県": "兵庫県産",
                "奈良県": "奈良県産",
                "岐阜県高山市": "岐阜県高山市産",
                "石川県": "石川県産"
            },
            keywords: {
                "フルーティー": "フルーティー",
                "華やか": "華やか",
                "すっきり": "すっきり",
                "上品": "上品",
                "クリア": "クリア",
                "繊細": "繊細",
                "軽快": "軽快",
                "やさしい甘み": "やさしい甘み",
                "甘い": "甘い",
                "スパークリング": "スパークリング",
                "芳醇": "芳醇",
                "最高級": "最高級",
                "濃醇": "濃醇",
                "スッキリ": "スッキリ",
                "キレ": "キレ",
                "シャープ": "シャープ",
                "やわらか": "やわらか",
                "滑らか": "滑らか",
                "爽やか": "爽やか",
                "まろやか": "まろやか",
                "エレガント": "エレガント",
                "深みのある": "深みのある",
                "穏やか": "穏やか",
                "酸味": "酸味",
                "コク": "コク",
                "ふくよかな香り": "ふくよかな香り",
                "サラリとした": "サラリとした"
            },
            alcohol:{
                alcohol: "アルコール",
                smv: "日本酒度数"
            },
            description: {
                "獺祭 純米大吟醸45": "初心者から日本酒愛好家まで幅広い層に支持される日本酒で、特にその華やかな香りとクリアな後味が際立っている。控えめな酸味と穏やかなコクが、飲みやすさをさらに引き立てている。",
                "獺祭 純米大吟醸 磨き三割九分": "軽やかさと深みを兼ね備えており、特に冷やして飲むとそのフルーティーな香りが引き立ちます。",
                "獺祭 純米大吟醸 磨き二割三分": "山田錦を23%まで精米し、白身魚の刺身や軽い味付けの和食と相性が良く、特別な日の乾杯酒としても最適です。",
                "松竹梅白壁蔵「澪」": "フルーティーで軽やかな、低アルコールで飲みやすく、日本酒が苦手な方や初心者向けとして人気が高いです。",
                "発泡清酒 すず音": "グラスに注いだ際に立ち上る繊細な泡が鈴の音を奏でるように見えることから名付けられた。アルコール度数は5%と低めで、甘酸っぱくフルーティーな味わいが特徴。",
                "久保田 萬寿 純米大吟醸": "「万物の寿を願う酒」という意味が込められて、飲みやすい口当たりや、重厚的でありながらフルーティーな香りが特徴。",
                "十四代 本丸 秘伝玉返し": "柔らかく優しい甘みと穏やかなマスカットのような香りが特徴で、十四代シリーズの中でも特に飲みやすいと評判。",
                "梵 プレミアムスパークリング": "兵庫県特A地区産の契約栽培山田錦を20%まで精米し、マイナス10℃で1年以上熟成させている高品質なスパークリング日本酒。上品で深みのある香りと、超微細な泡が特徴の薄にごり生原酒。",
                "三井の寿「大吟醸 寒乃蔵」": "華やかな香りと繊細な味わいが特徴で、特に冷やして飲むとその魅力が引き立っている。刺身や軽い味付けの和食と相性が良いとされている。",
                "醸し人九平次「EAU DU DÉSIR」": "フレンチや和食の繊細な料理ともよく合い、上品でフルーティな香りが、食中酒としても優れた評価を得ています。",
                "梵‧超吟": "約5年間、-10℃の氷温で熟成され、豊かな果実香と滑らかで深みのある味わいが特徴。日本の酒文化を代表する珠玉の名酒。",
                "十四代 純米吟醸 龍泉": "山形県の高木酒造が醸造する希少な日本酒で、特に入手困難な銘柄として知られている。口当たりは滑らかでありながら、フルーティーな香りと濃厚な旨味が特徴。",
                "鳳凰美田 純米吟醸 「Black Phoenix」": "栃木県の小林酒造が醸す限定品で、兵庫県産の希少な酒米「愛山」を使用している。厚みのある酸味と柔らかで芳醇な口当たりが特徴。",
                "久保田 純米大吟醸": "様々な料理との相性も良く、特に和食やシンプルな味付けの料理と組み合わせると引き立ちます。",
                "久保田 千寿 吟醸": "穏やかな香りとスッキリとした飲み口が特徴で、冷酒からぬる燗まで楽しむことができる柔軟な味わいの淡麗辛口日本酒。",
                "八海山 清酒": "料理との相性を重視して造られており、雑味のないクリアな口当たりと、キレのある辛口が楽しめます。",
                "特別本醸造 八海山": "新潟県の八海醸造が手掛ける日本酒で、やわらかな口当たりと淡麗な味わいが特徴。冷やしても燗にしても楽しめる、八海山を代表するお酒。",
                "純米吟醸 八海山 55%": "キレの良い辛口と米の旨味が絶妙に調和した純米吟醸酒で、冷酒からお燗まで、幅広い温度で風味を楽しむことができます。",
                "黒龍 純吟": "米本来の旨味を引き出しつつ、爽やかな飲み心地を追求した純米吟醸酒。味と香りのハーモニーが醸す深い旨さが特徴。",
                "黒龍 大吟醸": "福井県の黒龍酒造が醸す日本酒で、ふくよかな香り、透明な喉ごし、爽やかな飲み心地が人気の大吟醸。",
                "黒龍 しずく 純米大吟醸": "最高級の酒米「山田錦」を使用し、じっくりと丁寧に低温発酵させた大吟醸酒。透き通るように綺麗な味わいと、グレープフルーツや梅の花の香りが特徴。",
                "獺祭 純米大吟醸 にごりスパークリング45": "にごり酒ならではの米の甘みと、爽やかな炭酸が調和し、繊細かつ存在感のある味わいが楽しめます。",
                "春鹿 純米超辛口": "日本酒度+12の超辛口ながら、軽快でまろやかな口当たりが特徴。高精白された米と硬水の仕込み水を使用し、キレの良い味わいを実現している。",
                "ほまれ麒麟 純米大吟醸": "兵庫県産の山田錦と新潟県産の五百万石を等量ブレンドして、上品な香りときめ細やかな旨味、そして滑らかな喉ごしが特徴。冷やしても燗でも楽しめるお酒として評価されている。",
                "飛騨自慢鬼ころし本醸造": "岐阜県高山市の老田酒造店が醸造する日本酒で、江戸時代中期から続く伝統的な辛口酒。サラリとした端正な飲み口に、適度な旨味を感じる淡麗辛口の味わいが特徴。",
                "久保田 碧寿": "山廃仕込み特有の深みとコクがありながら、久保田シリーズらしいキレの良さも兼ね備えている。冷やしはもちろん、特に燗酒にすると、旨味が一層引き立ち、豊かな味わいを楽しめます。",
                "天狗舞 古古酒 純米大吟醸": "2年以上の熟成によって穏やかな香りと複雑な風味が加わり、口当たりが非常に滑らかでバランスの取れた味わいが楽しめる。",
                "天狗舞 山廃純米 ひやおろし": "石川県の車多酒造が醸す季節限定の日本酒。山廃仕込み特有の酸味と旨味が調和し、豊かでキレの良い香味が特徴。",
                "菊姫 山廃純米": "昭和58年に日本酒業界初となる「山廃仕込」と表示した純米酒として発売された。山廃仕込み特有の力強い酸味と濃醇な旨味が特徴で、好き嫌いのはっきり分かれる「男酒」として個性が光る。"
              },
        },
        beginner: {
            questions: {
                drink: "あなたのよく飲むお酒は？",
                concern: "自分に合わないと感じるお酒の特徴は？",
                occasion: "どんな時にお酒を楽しみますか？",
            },
            options: {
                drinks: {
                    wine: "ワイン",
                    beer: "ビール",
                    highball: "ハイボール",
                    none: "飲まない",
                },
                concerns: {
                    sweet: "甘い感じ",
                    dry: "辛口",
                    alcohol: "アルコール度",
                },
                occasions: {
                    relax: "リラックス時に",
                    food: "食事と一緒に",
                },
            },
            result: {
                title: "あなたにぴったりの日本酒",
                subtitle: "です",
                tryAgain: "もう一度酒見っけ",
                backToQuiz: "クイズ選択に戻る",
            },
        },
        taste: {
            questions: {
                taste: "どんな味わいの日本酒を探していますか？",
                mood: "どんな雰囲気の日本酒を探していますか？",
                pairing: "日本酒を何と合わせたいですか？",
            },
            options: {
                tastes: {
                    kire: "キレ",
                    fruity: "フルーティー",
                    sweet: "甘口",
                    dry: "辛口",
                },
                moods: {
                    refreshing: "さわやか",
                    smooth: "滑らか",
                    heavy: "重たい",
                    elegant: "華やか",
                },
                pairings: {
                    western: "洋食",
                    japanese: "和食",
                    dessert: "デザート",
                    alone: "単体",
                },
            },
            result: {
                title: "あなたにぴったりの日本酒",
                subtitle: "です",
                tryAgain: "もう一度酒見っけ",
                backToQuiz: "診断選択に戻る",
            },
        },
        washoku: {
            questions: {
                category: "どんな料理がお好きですか？",
                刺身: "どの刺身がお好みですか？",
                椀盛: "どの椀物がお好みですか？",
                焼き魚: "どの焼き魚がお好みですか？",
                揚げ物: "どの揚げ物がお好みですか？",
                鍋: "どの鍋料理がお好みですか？",
            },
            options: {
                categories: {
                    sashimi: "刺身",
                    soup: "椀盛",
                    grilled: "焼き魚",
                    fried: "揚げ物",
                    nabe: "鍋",
                },
                sashimi: {
                    buri: "ブリ",
                    salmon: "サーモン",
                    seabream: "タイ",
                },
                soup: {
                    shio: "潮仕立て",
                    white: "白味噌仕立て",
                    hatcho: "八丁味噌仕立て",
                },
                grilled: {
                    saba: "サバの塩焼き",
                    buri: "ブリの照り焼き",
                    sawara: "鰆の西京焼き",
                },
                fried: {
                    chicken: "鶏の竜田揚げ",
                    pork: "とんかつ",
                    anago: "アナゴの天ぷら",
                },
                nabe: {
                    yose: "寄せ鍋",
                    sukiyaki: "すき焼き",
                    buri: "ブリしゃぶ",
                },
            },
            result: {
                title: "あなたにぴったりの日本酒",
                subtitle: "です",
                tryAgain: "もう一度酒見っけ",
                backToQuiz: "診断選択に戻る",
            },
        },
    },
};

const languages = [
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "en", name: "English", flag: "🇺🇸" },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [mounted, setMounted] = useState(false);
    const [language, setLanguage] = useState("ja"); // Default to 'ja'

    useEffect(() => {
        // Only access localStorage after component mounts on client
        const storedLanguage = localStorage.getItem("preferredLanguage");
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        // Only update localStorage after initial mount
        if (mounted) {
            localStorage.setItem("preferredLanguage", language);
        }
    }, [language, mounted]);

    // Provide initial translations even before mount
    const t = translations[language] || translations.ja;

    // You can optionally return a loading state or initial state during SSR
    if (!mounted) {
        return (
            <LanguageContext.Provider
                value={{ language: "ja", t: translations.ja, languages }}
            >
                {children}
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, t, languages }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
