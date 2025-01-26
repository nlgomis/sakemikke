'use client';
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

const LikeButton = ({ sakeId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await fetch(
          `https://backmikke.onrender.com/api/likes/check/${sakeId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        setIsLiked(data.liked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    checkLikeStatus();
  }, [sakeId, isAuthenticated, user]);

  const handleLike = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setIsLiked(!isLiked);

    try {
      const response = await fetch(
        "https://backmikke.onrender.com/api/likes/toggle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ sakeId }),
        }
      );

      const data = await response.json();
      if (data.liked !== !isLiked) {
        setIsLiked(data.liked);
      }
    } catch (error) {
      setIsLiked(!isLiked);
      console.error("Error toggling like:", error);
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