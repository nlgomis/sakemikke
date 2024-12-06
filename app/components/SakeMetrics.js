import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SakeMetrics = ({ sakeData }) => {
  const alcoholRef = useRef(null);
  const sakeValueRef = useRef(null);
  const sakeValueFillRef = useRef(null);

  const getSakeValuePosition = (value) => {
    return ((parseFloat(value) + 100) / 200) * 100;
  };

  useEffect(() => {
    // Animate alcohol bar
    gsap.to(alcoholRef.current, {
      width: `${parseFloat(sakeData.alcohol)}%`,
      duration: 1.2,
      ease: "power2.out"
    });

    const sakePosition = getSakeValuePosition(sakeData.sakeValue);
    
    // Animate sake value slider
    gsap.to(sakeValueRef.current, {
      left: `${sakePosition}%`,
      duration: 1.2,
      ease: "power2.out"
    });

    // Animate the fill effect
    if (sakePosition >= 50) {
      gsap.to(sakeValueFillRef.current, {
        left: "50%",
        width: `${sakePosition - 50}%`,
        duration: 1.2,
        ease: "power2.out"
      });
    } else {
      gsap.to(sakeValueFillRef.current, {
        left: `${sakePosition}%`,
        width: `${50 - sakePosition}%`,
        duration: 1.2,
        ease: "power2.out"
      });
    }
  }, [sakeData]);

  return (
    <div className="space-y-4 mt-8">
      <div className="mb-10 sm:mb-0">
        <div className="flex justify-between text-base lg:text-lg mb-2">
          <span>アルコール</span>
          <span>{sakeData.alcohol}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={alcoholRef}
            className="h-full bg-blue-500 rounded-full"
            style={{ width: 0 }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-base lg:text-lg mb-2">
          <span>日本酒度数</span>
          <span>{sakeData.sakeValue}</span>
        </div>
        <div className="relative h-2 bg-white/10 rounded-full">
          {/* Outer container with padding for dot overflow */}
          <div className="absolute inset-0">
            {/* Center line indicator */}
            <div className="absolute left-1/2 top-1/2 w-0.5 h-4 -translate-y-1/2 bg-white/30" />
            
            {/* Fill effect */}
            <div
              ref={sakeValueFillRef}
              className="absolute top-0 h-full bg-blue-500/50"
              style={{ left: "50%", width: 0 }}
            />
          </div>
          
          {/* Dot indicator with extended hitbox */}
          <div className="absolute inset-0 -mx-1.5">
            <div
              ref={sakeValueRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full z-10"
              style={{ left: "50%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SakeMetrics;