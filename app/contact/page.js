import React from "react";

export default function ContactPage() {
  return (
    <div className="pt-16 min-h-screen flex flex-col justify-between bg-black text-white">
      {/* タイトル */}
      <div className="flex items-center pl-14 pr-16 pt-16 pb-12">
        <h1 className="pb-4 text-7xl font-normal whitespace-nowrap">
          Contact Us
        </h1>
        <div className="h-10 flex-1 bg-white ml-10"></div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 px-16 pb-12">
        {/* 左側のフォーム */}
        <div className="flex-1 w-full">
          <form className="flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row gap-6">
              {" "}
              {/* lg:flex-rowを追加 */}
              <label className="flex-1">
                <div className="flex items-center border-b border-white pb-2">
                  <span className="text-lg font-light w-16">Name</span>
                  <input
                    type="text"
                    className="flex-1 p-2 bg-transparent rounded-none focus:outline-none text-white"
                  />
                </div>
              </label>
              <label className="flex-1">
                <div className="flex items-center border-b border-white pb-2">
                  <span className="text-lg font-light w-16">Email</span>
                  <input
                    type="email"
                    className="flex-1 p-2 bg-transparent rounded-none focus:outline-none text-white"
                  />
                </div>
              </label>
            </div>
            <label className="flex flex-col">
              <span className="text-lg font-light mb-2">Write to us</span>
              <textarea
                className="w-full p-2 bg-transparent border-b border-white rounded-none focus:outline-none text-white"
                rows="6"
              ></textarea>
            </label>
          </form>
        </div>

        {/* 右側のディレクター情報 */}
        <div className="flex-1 w-full lg:max-w-xl grid grid-cols-2 gap-y-10 gap-x-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-lg font-semibold">Director</span>
              <span className="text-sm">ths31111@ths.hal.ac.jp</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-2">
        <button className="px-6 py-2 bg-transparent text-white border border-white rounded transition-all duration-300 hover:bg-white hover:text-black">
          Send
        </button>
      </div>

      {/* フッター */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2024 SAKEMIKKE. All rights reserved.
      </footer>
    </div>
  );
}
