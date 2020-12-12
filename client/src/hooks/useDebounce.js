import React from 'react';
/**
 * 
 * @param {string} value value to set
 * @param {number} delay after the amount of time
 */


const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState("");
    
    React.useEffect(() =>{
        const timeOut = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(timeOut);
        }
    }, [delay, value]);

    return debouncedValue;
}

export default useDebounce;