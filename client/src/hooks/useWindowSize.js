import { useState, useEffect, useCallback } from 'react';

const useWindowSize = () => {
    const isClient = typeof window === 'object';

    // here we use useCallback to prevent unnecessary re-render of
    // our function, unless isClient is false
    // meaning if window is not an object
    const getSize = useCallback(() => {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        }
    }, [isClient]);

    const [windowSize, setWindowSize] = useState(getSize)

    // we need to reset the size if the window get resized
    useEffect(() => {
        if(!isClient){
            return;
        }

        const handleWindowResize = () => {
            setWindowSize(getSize());
        }
        window.addEventListener('resize', handleWindowResize);

        // cleanup, remove the event listener
        return window.removeEventListener('resize', handleWindowResize);
    }, [isClient, getSize]);

    return windowSize;
}

export default useWindowSize;