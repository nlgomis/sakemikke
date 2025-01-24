"use client";

import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function ContactPage() {

  const { t } = useLanguage();

  // フォームデータの状態管理
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // フォーム送信状態
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ディレクターリスト（変更なし）
  const directors = [
    { name: `田 雨シン (${t.user.director})`, email: "ths31111@ths.hal.ac.jp" },
    { name: `甘 曉楠(${t.user.designer})`, email: "ths31224@ths.hal.ac.jp" },
    { name: `鈴木 悠斗（${t.user.designer})`, email: "ths30337@ths.hal.ac.jp" },
    { name: `河内 弥衣（${t.user.designer})`, email: "ths30913@ths.hal.ac.jp" },
    { name: `田村 結（${t.user.designer})`, email: "ths30413@ths.hal.ac.jp" },
    { name: `Gomis Nil (${t.user.engineer})`, email: "ths30822@ths.hal.ac.jp" },
    { name: `呉島 大暉（${t.user.engineer})`, email: "ths30169@ths.hal.ac.jp" },
    { name: `小川 登生（${t.user.engineer})`, email: "ths31289@ths.hal.ac.jp" },
  ];

  // 入力フィールド変更ハンドラ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // フォーム送信ハンドラ
  const handleSubmit = (e) => {
    e.preventDefault();

    // フォームデータをリセット
    setFormData({ name: "", email: "", message: "" });

    // 送信済み状態に設定
    setIsSubmitted(true);


    // 3秒後に元の状態に戻す
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      <div className="pt-16 min-h-screen flex flex-col justify-between text-white z-10 relative">
        {/* タイトル部分 */}
        <div className="flex items-center px-4 sm:px-8 md:pl-14 md:pr-16 pt-16 pb-12">
          <h1 className="pb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal">
            Contact Us
          </h1>
          <div className="h-10 flex-1 bg-white ml-4 sm:ml-6 md:ml-10"></div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 px-4 sm:px-8 md:px-16 pb-12">
          {/* 左側のフォーム */}
          <div className="flex-1 w-full">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 lg:gap-12"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <label className="flex-1">
                    <div className="flex items-center border-b border-white pb-2">
                      <span className="text-base lg:text-lg font-light w-16">
                        Name
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="flex-1 p-2 bg-transparent rounded-none focus:outline-none text-white"
                      />
                    </div>
                  </label>
                  <label className="flex-1">
                    <div className="flex items-center border-b border-white pb-2">
                      <span className="text-base lg:text-lg font-light w-16">
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="flex-1 p-2 bg-transparent rounded-none focus:outline-none text-white"
                      />
                    </div>
                  </label>
                </div>
                <label className="flex flex-col">
                  <span className="text-base lg:text-lg font-light mb-2">
                    Write to us
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-transparent border-b border-white rounded-none focus:outline-none text-white"
                    rows="6"
                  ></textarea>
                </label>
              </form>
            ) : (
              <div className="text-center text-white text-xl">
                メッセージを送信しました
              </div>
            )}
          </div>

          {/* 右側のディレクター情報 */}
          <div className="flex-1 w-full lg:max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-8">
            {directors.map((director, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-base lg:text-lg font-semibold">
                  {director.name}
                </span>
                <span className="text-xs lg:text-sm">{director.email}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="text-center py-2">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-transparent text-white border border-white rounded transition-all duration-300 hover:bg-white hover:text-black"
          >
            Send
          </button>
        </div>

        {/* フッター */}
        <footer className="py-6 text-center text-white-500 text-sm">
          © 2025 SAKEMIKKE. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
