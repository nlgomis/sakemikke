export const getResult = (category, specific) => {
    const results = {
        刺身: {
            ブリ: "純米吟醸 八海山 55%",
            サーモン: "獺祭 純米大吟醸 磨き三割九分",
            タイ: "梵‧超吟",
        },
        椀盛: {
            潮仕立て: "天狗舞 古古酒 純米大吟醸",
            白味噌仕立て: "久保田 千寿 吟醸",
            八丁味噌仕立て: "梵‧超吟",
        },
        焼き魚: {
            サバの塩焼き: "天狗舞 山廃純米",
            ブリの照り焼き: "十四代 本丸 秘伝玉返し",
            鰆の西京焼き: "純米吟醸 八海山 55%",
        },
        揚げ物: {
            鶏の竜田揚げ: "久保田 萬寿",
            とんかつ: "黒龍 大吟醸",
            アナゴの天ぷら: "黒龍 純吟",
        },
        鍋: {
            寄せ鍋: "獺祭 にごりスパークリング45",
            すき焼き: "天狗舞 古古酒 純米大吟醸",
            ブリしゃぶ: "久保田 千寿",
        },
    };

    return results[category][specific];
};
