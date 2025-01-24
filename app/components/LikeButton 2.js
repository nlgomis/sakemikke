import React, { useState } from "react";

const LikeButton = ({ sakeId }) => {
  // localStorage から初期状態を取得
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== "undefined") {
      const liked = localStorage.getItem(`sake-liked-${sakeId}`);
      return liked === "true";
    }
    return false;
  });

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);

    // localStorage に状態を保存
    if (typeof window !== "undefined") {
      localStorage.setItem(`sake-liked-${sakeId}`, (!isLiked).toString());
    }
  };

  return (
    <button
      onClick={handleLike}
      className="p-0 hover:scale-110 transition-transform"
      aria-label={isLiked ? "お気に入りから削除" : "お気に入りに追加"}
    >
      <img
        src={isLiked ? "/images/liked_icon.png" : "/images/like_icon.png"}
        alt="Like button"
        className="w-6 h-6 hover:brightness-75"
      />
    </button>
  );
};

export default LikeButton;
