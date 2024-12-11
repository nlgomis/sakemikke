import React from "react";

const Tooltip = ({
    text,
    children,
    position = "bottom",
    className = "",
    tooltipClassName = "",
}) => {
    const positionStyles = {
        left: "right-full mr-2 sm:left-auto sm:right-0 sm:top-full sm:ml-0 sm:mt-2",
        right: "left-full ml-2 sm:right-auto sm:left-0 sm:top-full sm:mr-0 sm:mt-2",
        top: "bottom-full mb-2 sm:top-auto sm:bottom-0 sm:left-full sm:mt-0 sm:ml-2",
        bottom: "top-full mt-2 sm:bottom-auto sm:top-0 sm:left-full sm:mb-0 sm:ml-2",
    };

    return (
        <div className={`relative group inline-block ${className}`}>
            {children}
            <span 
            className={`
            absolute 
            z-[11] 
            p-3 
            w-40
            3xs:w-48
            2xs:w-52
            xs:w-60
            sm:w-52
            md:w-60
            lg:w-48
            xl:w-80 
            2xl:w-80
            mx-auto
            bg-gradient-to-br
            from-white 
            via-[#38c9de]
            to-[#38c9de]
            text-white 
            leading-normal
            tracking-wide
            break-words
            whitespace-break-spaces
            text-xs 
            lg:text-sm 
            rounded-3xl
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-300 
            pointer-events-none
            ${positionStyles[position]}
            ${tooltipClassName}
            `}
            >
                {text}
            </span>
        </div>
    );
};

export default Tooltip;
