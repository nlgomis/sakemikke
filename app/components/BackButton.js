import React from "react";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ children, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="group relative"
        >
            <div className="gradient-border2">
                <div className="red-glow glow"></div>
                <div className="cyan-glow glow"></div>
                <div className="purple-glow glow"></div>
                <div className="white-glow glow"></div>
                <div className="flex items-center">
                <ArrowLeft 
                        className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:-translate-x-2" 
                    />
                    <span className="text-base sm:text-lg ml-2">{children}</span>
                </div>
            </div>
        </button>
    );
};

export default BackButton;