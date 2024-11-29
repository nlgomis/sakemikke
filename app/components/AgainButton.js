import React from "react";


const AgainButton = ({ children, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="group relative"
        >
            <div className="gradient-border3">
                <div className="red-glow glow"></div>
                <div className="cyan-glow glow"></div>
                <div className="purple-glow glow"></div>
                <div className="white-glow glow"></div>
                <div className="flex items-center">
                    <span className="text-base sm:text-lg">{children}</span>
                </div>
            </div>
        </button>
    );
};

export default AgainButton;