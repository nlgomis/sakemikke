import React from 'react';

const SakeRadarChart = ({ sakeData }) => {
  const center = 100;
  const scale = 0.7;

  // Calculate points for the radar chart
  const calculatePoint = (value, angle) => {
    const adjustedValue = value * scale;
    const x = center + adjustedValue * Math.cos(angle - Math.PI / 2);
    const y = center + adjustedValue * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  // Order and position metrics to match original layout
  const metrics = [
    { name: '華やかさ', value: sakeData.sakeGrade.fragrance, position: 'top' },
    { name: 'キレ', value: sakeData.sakeGrade.clarity, position: 'right' },
    { name: 'コク', value: sakeData.sakeGrade.body, position: 'bottom' },
    { name: '酸味', value: sakeData.sakeGrade.acidity, position: 'left' }
  ];

  const points = metrics.map((metric, i) => {
    const angle = (i * 2 * Math.PI) / metrics.length;
    return calculatePoint(metric.value, angle);
  });

  const pathData = points.map((point, i) => 
    (i === 0 ? 'M' : 'L') + `${point.x},${point.y}`
  ).join(' ') + 'Z';

  // Create circular grid lines
  const createGridCircles = () => {
    const circles = [];
    const levels = 4; // Number of circles

    for (let i = 1; i <= levels; i++) {
      const radius = (100 * scale * i) / levels;
      circles.push(
        <circle
          key={`circle-${i}`}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      );
    }
    return circles;
  };

  return (
    <div className="relative aspect-square max-w-[300px] mx-auto mb-10 sm:mb-0">
      {/* Main SVG Chart */}
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background lines */}
        <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(255,255,255,0.2)" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(255,255,255,0.2)" />

        {/* Circular grid */}
        {createGridCircles()}

        {/* Chart area */}
        <path
          d={pathData}
          fill="rgba(34, 197, 94, 0.5)"  // Changed to green-500 with opacity
          stroke="rgba(34, 197, 94, 0.5)" // Matching stroke color
          strokeWidth="1"
        />
      </svg>

      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Top Label */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-sm">
          華やかさ ({sakeData.sakeGrade.fragrance})
        </div>
        
        {/* Bottom Label */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-sm">
          コク ({sakeData.sakeGrade.body})
        </div>
        
        {/* Left Label */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 text-sm">
          酸味 ({sakeData.sakeGrade.acidity})
        </div>
        
        {/* Right Label */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 text-sm">
          キレ ({sakeData.sakeGrade.clarity})
        </div>
      </div>
    </div>
  );
};

export default SakeRadarChart;