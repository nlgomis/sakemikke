"use client";

const LoadingAnimation = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <style jsx>{`
        .loader {
          width: fit-content;
          font-size: 40px;
          font-family: system-ui, sans-serif;
          font-weight: bold;
          text-transform: uppercase;
          color: #0000;
          -webkit-text-stroke: 1px #fff;
          background:
            radial-gradient(0.71em at 50% 1em,#fff 99%,#0000 101%) calc(50% - 1em) 1em/2em 200% repeat-x text,
            radial-gradient(0.71em at 50% -0.5em,#0000 99%,#fff 101%) 50% 1.5em/2em 200% repeat-x text;
          animation: 
            l10-0 .8s linear infinite alternate,
            l10-1 4s linear infinite;
        }
        .loader:before {
          content: "Loading";
        }
        @keyframes l10-0 {
          to {
            background-position-x: 50%, calc(50% + 1em)
          }
        }
        @keyframes l10-1 {
          to {
            background-position-y: -.5em,0
          }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );
};

export default LoadingAnimation;