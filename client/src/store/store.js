import React, { createContext, useContext, useReducer } from 'react';

/**
 * 
 */

import { authInitialState, authReducer } from './auth';
import { messageInitialState, messageReducer } from './message';

const storeContext = createContext();

const store = {
    auth: authInitialState,
    message: messageInitialState
}

const reducers = () => ({
    auth: authReducer,
    message: messageReducer
})


export const ContextProvider = ({children}) => {
    <storeContext.Provider value={useReducer(reducers, store)}>
        {children}
    </storeContext.Provider>
}

export const useStore = useContext(storeContext);