import React, { useEffect } from 'react';

/**
 * scroll to the top of any component rendered
 * 
 * @param {component} children wrapped component 
 */
export default function ({ children, location: { pathname } }){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname]);

    return children || null;
}