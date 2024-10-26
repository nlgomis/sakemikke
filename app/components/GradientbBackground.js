import React from 'react';

const GradientBackground = ({ className = "" }) => {
  const blobs = [
    { 
      color: '#163a6a', 
      position: '-left-64 lg:-left-64 -left-32', 
      delay: '',
      size: 'lg:w-[800px] lg:h-[800px] w-[500px] h-[650px]',
      opacity: 0.7,
      animation: 'animate-blob-slow'
    },
    { 
      color: '#453055', 
      position: 'lg:left-1/4 left-1/4 lg:-top-48 -top-24', 
      delay: 'animation-delay-2000',
      size: 'lg:w-[650px] lg:h-[650px] w-[400px] h-[500px]',
      opacity: 0.7,
      animation: 'animate-blob-reverse'
    },
    { 
      color: '#000000', 
      position: 'lg:-right-48 -right-24 lg:-top-48 -top-24', 
      delay: 'animation-delay-4000',
      size: 'lg:w-[550px] lg:h-[550px] w-[375px] h-[375px]',
      opacity: 0.8,
      animation: 'animate-blob'
    },
    { 
      color: '#1c314e', 
      position: 'lg:-right-48 -right-24 lg:-top-28 -top-14', 
      delay: 'animation-delay-1000',
      size: 'lg:w-[700px] lg:h-[800px] w-[400px] h-[450px]',
      opacity: 0.9,
      animation: 'animate-blob-slow'
    },
    { 
      color: '#000000', 
      position: 'lg:-left-48 -left-24 bottom-0', 
      delay: 'animation-delay-3000',
      size: 'lg:w-[750px] lg:h-[750px] w-[375px] h-[375px]',
      opacity: 0.8,
      animation: 'animate-blob-reverse'
    },
    { 
      color: '#060460', 
      position: 'lg:left-1/2 left-1/5 lg:-bottom-40 -bottom-20', 
      delay: 'animation-delay-5000',
      size: 'lg:w-[800px] lg:h-[750px] w-[425px] h-[375px]',
      opacity: 0.7,
      animation: 'animate-blob'
    },
    { 
      color: '#453055', 
      position: 'lg:-right-32 -right-16 lg:-bottom-40 -bottom-20', 
      delay: 'animation-delay-6000',
      size: 'lg:w-[500px] lg:h-[500px] w-[400px] h-[400px]',
      opacity: 0.7,
      animation: 'animate-blob-slow'
    }
  ];

  return (
    <div className={`fixed inset-0 w-full h-full ${className}`}>
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 blur-[70px]">
        {blobs.map((blob, index) => (
          <div 
            key={index}
            className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.animation} ${blob.delay}`}
            style={{ 
              backgroundColor: blob.color,
              mixBlendMode: 'lighten',
              opacity: blob.opacity
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GradientBackground;