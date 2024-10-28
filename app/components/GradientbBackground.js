import React, { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const interBubbleRef = useRef(null);
  
  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const interBubble = interBubbleRef.current;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      
      requestAnimationFrame(move);
    }

    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    move();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed w-screen h-screen">
      <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-8xl font-dongle opacity-80 select-none text-shadow">
      </div>
      
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[rgb(0,0,0)] to-[rgb(0,0,0)]">
        <svg  className="hidden">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        
        <div className="w-full h-full filter-goo blur-[40px]">
          {/* 青 */}
          <div className="absolute w-4/5 h-4/5 top-[10%] left-[10%] bg-[radial-gradient(circle_at_center,rgba(18,113,255,0.8)_0,rgba(18,113,255,0)_50%)] mix-blend-hard-light animate-moveVertical" />
          
          {/* 紫 */}
          <div className="absolute w-4/5 h-4/5 top-[10%] left-[10%] bg-[radial-gradient(circle_at_center,rgba(221,74,255,0.8)_0,rgba(221,74,255,0)_50%)] mix-blend-hard-light animate-moveInCircleReverse origin-[-400px_center]" />
          
          {/* 水 */}
          <div className="absolute w-4/5 h-4/5 top-[calc(10%+200px)] left-[calc(10%-500px)] bg-[radial-gradient(circle_at_center,rgba(100,220,255,0.8)_0,rgba(100,220,255,0)_50%)] mix-blend-hard-light animate-moveInCircle origin-[400px_center]" />
          
          {/* 赤 */}
          <div className="absolute w-4/5 h-4/5 top-[10%] left-[10%] bg-[radial-gradient(circle_at_center,rgba(200,50,50,0.8)_0,rgba(200,50,50,0)_50%)] mix-blend-hard-light animate-moveHorizontal origin-[-200px_center] opacity-70" />

          {/* 黄 */}
          <div className="absolute w-[160%] h-[160%] top-[-30%] left-[-30%] bg-[radial-gradient(circle_at_center,rgba(180,180,50,0.8)_0,rgba(180,180,50,0)_50%)] mix-blend-hard-light animate-moveInCircle origin-[-800px_200px]" />
          
          {/* マウスの動きに合わせて動く色（紫） */}
          <div
            ref={interBubbleRef}
            className="absolute w-full h-full top-[-50%] left-[-50%] bg-[radial-gradient(circle_at_center,rgba(140,100,255,0.8)_0,rgba(140,100,255,0)_50%)] mix-blend-hard-light opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default GradientBackground;