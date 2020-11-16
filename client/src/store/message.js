//not used yet, just for the sake of example

const SET_USER_MESSAGE = "SET_USER_MESSAGE";
const CLEAR_USER_MESSAGE = "CLEAR_USER_MESSAGE";

export const messageInitialState = {
    message: ""
}

export const messageReducer = (state = messageInitialState, action) => {
    switch(action.type){
        case SET_USER_MESSAGE:
            return{
                ...state,
                message: action.payload
            }
        case CLEAR_USER_MESSAGE:
            return{
                ...state,
                ...messageInitialState
            }
        default: return messageInitialState
    }
}