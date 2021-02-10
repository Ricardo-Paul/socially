import React, { createContext, useContext, useReducer } from 'react';

/**
 * intitial state and reducers imports
 */
import { authInitialState, authReducer } from './auth';
import { messageInitialState, messageReducer } from './message';
import { prefrencesInitialState, preferencesReducer } from "./preferences";

/**
 * create context
 */
const StoreContext = createContext();

/**
 * combine inital states
 */
const store = {
    auth: authInitialState,
    message: messageInitialState,
    preferences: prefrencesInitialState
}

/**
 * 
 * @param {obj} store the combined state object
 * @param {obj} action action type and payload
 */
const reducers = (store, action) => ({
    auth: authReducer(store.auth, action),
    message: messageReducer(store.message, action),
    preferences: preferencesReducer(store.preferences, action)
});


/**
 * 
 * @param {*} children wrapped components
 */

 // store should return something
export const StoreProvider = ({children}) => {
    return <StoreContext.Provider value={useReducer(reducers, store)}>
         { children }
    </StoreContext.Provider>
}

/**
 * custom hook for consuming the store
 */

 export const useStore = () => useContext(StoreContext);
//  useReducer returns [ state, dispatch ]
// which can be destructured from the context like
// const [reducers, dispatch] = useStore();
// const [{auth, message}, dispatch] = useStore();



//sort of a custom useStore
// when importing into a file
// we can access the state by destructuring like
// const [store: {auth: {}, message:{}, preferences:{}}, dispatch] = useStore();
//meaning it returns our init state in an array