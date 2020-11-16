/**
 * authentication store
 */

 /**
  * action types
  */
const SET_AUTH_USER = "SET_AUTH_USER"
const CLEAR_AUTH_USER = "CLEAR_AUTH_USER"

export const authInitialState = {
    user: null
}

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER:
            return{
                ...state,
                user: action.payload
            }
        case CLEAR_AUTH_USER:
            return{
                ...state,
                ...authInitialState
            }
        default: return authInitialState
            break;
    }
}