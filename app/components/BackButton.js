import React from "react";

const BackButton = ({ children, onClick }) => {
    return (
        <button onClick={onClick}>
            <div className="gradient-border2">
                <div className="red-glow glow"></div>
                <div className="cyan-glow glow"></div>
                <div className="purple-glow glow"></div>
                <div className="white-glow glow"></div>
                <span className="text-base sm:text-lg">{children}</span>
            </div>
        </button>
    );
};

export default BackButton;