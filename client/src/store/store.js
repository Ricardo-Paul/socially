import React, { createContext, useContext, useReducer } from 'react';

/**
 * intitial state and reducers imports
 */
import { authInitialState, authReducer } from './auth';
import { messageInitialState, messageReducer } from './message';

/**
 * create context
 */
const StoreContext = createContext();

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

 // store should return something
export const StoreProvider = ({children}) => {
    return <StoreContext.Provider value={useReducer(reducers, store)}>
         { children }
    </StoreContext.Provider>
}

/**
 * custom hook for consuming the store
 */

 const useStore = () => useContext(StoreContext);



//sort of a custom useStore
// when importing into a file
// we can access the state by destructuring like
// const [{auth, message}] = useStore();
//meaning it returns our init state in an array