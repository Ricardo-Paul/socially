const SET_THEME = "set_theme"

const theme = localStorage.getItem("theme");
export const prefrencesInitialState = {
  theme: theme
}

export const preferencesReducer = (state = prefrencesInitialState, action) => {
  switch (action.type) {
    case SET_THEME: {
      return {
        ...state,
        theme: action.payload
      }
    }
    default: return state
  }
}