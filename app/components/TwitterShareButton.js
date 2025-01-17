import React from "react";

const TwitterShareButton = ({ url, result }) => {
  const tweetText = `私の日本酒診断結果は「${result}」でした！\nあなたにぴったりの日本酒を見つけよう！\n\n`;

  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}&url=${encodeURIComponent(url)}`;

  const handleShare = (e) => {
    e.preventDefault();
    window.open(
      shareUrl,
      "TwitterShare",
      "width=550,height=450,menubar=no,toolbar=no,scrollbars=yes"
    );
  };

  return (
    <button
      onClick={handleShare}
      className="p-0 hover:scale-110 transition-transform"
      aria-label="Share on Twitter"
    >
      <img
        src="/images/x_icon_new.png"
        alt="X icon"
        className="w-6 h-6 hover:brightness-75"
      />
    </button>
  );
};

export default TwitterShareButton;
