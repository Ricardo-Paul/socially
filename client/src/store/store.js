import React, { createContext, useContext, useReducer } from 'react';

/**
 * intitial state and reducers imports
 */
import { authInitialState, authReducer } from './auth';
import { messageInitialState, messageReducer } from './message';

/**
 * create context
 */
const storeContext = createContext();

/**
 * combine inital states
 */
const store = {
    auth: authInitialState,
    message: messageInitialState
}

/**
 * 
 * @param {obj} store the combined state object
 * @param {obj} action action tye and payload
 */
const reducers = (store, action) => ({
    auth: authReducer(store.auth, action),
    message: messageReducer(store.message, action)
});


/**
 * 
 * @param {*} children wrapped components
 */
export const ContextProvider = ({children}) => {
    <storeContext.Provider value={useReducer(reducers, store)}>
        {children}
    </storeContext.Provider>
}


export const useStore = useContext(storeContext);

//sort of a custom useStore
// when importing into a file
// we can access the state by destructuring like
// const [{auth, message}] = useStore();
//meaning it returns our init state in an array