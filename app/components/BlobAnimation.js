import React, { useEffect, createRef } from 'react';
import Lottie from 'lottie-web-light';

const BlobAnimation = () => {
    const animationContainer = createRef();

    useEffect(() => {
        const anim = Lottie.loadAnimation({
            container: animationContainer.current,
            loop: true,
            autoplay: true,
            path: "/animations/blobAnimation.json",
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        })

        return () => anim.destroy();
    }, [animationContainer]);

    return (
        <div 
            className='absolute -z-10 opacity-50 -inset-1/4 overflow-visible scale-90' 
            ref={animationContainer} 
        />
    );
};

export default BlobAnimation;