import React from "react";

const ShoppingCartButton = ({ url }) => {
  const handleClick = (e) => {
    e.preventDefault();
    // URLが提供されている場合はそのページに遷移
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-0 hover:scale-110 transition-transform"
      aria-label="商品ページへ"
    >
      <img
        src="/images/bag_icon_new.png"
        alt="Shopping cart icon"
        className="w-6 h-6 hover:brightness-75"
      />
    </button>
  );
};

export default ShoppingCartButton;
