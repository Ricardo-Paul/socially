// That's the very root of the app
import React, { createContext, useContext, useState } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './utils/createApolloClient';


// root component
import App from './components/App/App';
import { StoreProvider, useStore } from './store/store';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { themes } from './constants/AppTheme';
const { DARK_THEME, LIGHT_THEME, DEFAULT_THEME } = themes;

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const getMuiTheme = SELECTED_THEME => createMuiTheme({
  palette: APP_THEMES[SELECTED_THEME],
  overrides: {
    MuiIconButton: {
      fontSizeSmall: {
        fontSize: "1.7rem"
      }
    },
  }
});

const white = "#ffffff"

const APP_THEMES = {
  [DARK_THEME]: {
    primary: {
      dark:"#18191A", // 
      main: "#242526", // dark_background
      light: "#424242", // light_background
      contrastText: "#bbbbba" // text_color
  },
  secondary: {
      main: "#424242",
      dark: "#888584", //icons fill color
      light: "#d8d8d847",
    },
  shape: {
    borderRadius: "0.5rem",
    inputBorderRadius: "1.5rem",
    borderColor: "0px solid #d4d2d2"
  },
  custom: {
    palette: {
      drawerBackground: "#333333",
      paleNuance: "#2f2e2e",
      helperText: "#a9482a",
      likeColor: "#0b80ef",
      thirdColor: "#5e2367",
      thirdColorText: "#efefef"

    },
    drawerWidth: 300,
    peopleBoxWidth: 450,
    boxShadow: "0px 4px 9px 0px #0c0c0c",
    border: "0.1px solid #424242",
  }
},

  [LIGHT_THEME]: {
    primary: {
      dark:"#f3f3f3",
      main: white,
      light: "#efefef",
      contrastText: "#505050"
  },
  secondary: {
      main: "#a7a6a6",
      dark: "#888584", //icons fill color
      light: "#d8d8d847"
    },
  shape: {
      borderRadius: "0.5rem",
      inputBorderRadius: "1.5rem",
      borderColor: "1px solid #d4d2d2"
    },
  custom: {
      palette: {
        drawerBackground: "#ffffff",
        paleNuance: "#ffffff",
        helperText: "#a9482a",
        likeColor: "#0b80ef"
      },
      drawerWidth: 300,
      peopleBoxWidth: 450,
      boxShadow: "rgb(255 255 255) 0px 0px 0px",
    }
  }
}
// http and websockekt links
const apiUrl = process.env.REACT_APP_API_URL;
const webSocketApiUrl = process.env.REACT_APP_WEBSOCKET_URL;
const client = createApolloClient(apiUrl, webSocketApiUrl);


const CustomThemeContext = createContext({
  currentTheme: DEFAULT_THEME, //analogous to a store (themeName)
  setTheme: null // analogous to dispatch (setThemeName)
});

function CustomThemeProvider(props){
  const { children } = props;
  let theme;

  const currentThemeName = localStorage.getItem("theme");
  if(!currentThemeName){
    theme = getMuiTheme(DEFAULT_THEME);
    localStorage.setItem("theme", DEFAULT_THEME)
  }

  if(currentThemeName === DARK_THEME || currentThemeName === LIGHT_THEME ){
    theme = getMuiTheme(currentThemeName)
    localStorage.setItem("theme", currentThemeName)
  }

  const [ themeName, _setThemeName ] = useState(currentThemeName);

  // a wrapper around _setThemeName to also save the theme to localStora
  const setThemeName = (name) => {
     localStorage.setItem("theme", name)
    _setThemeName(name)
  }

  const contexValue = {
    currentTheme: themeName,
    setTheme: setThemeName
  };

  return(
     <CustomThemeContext.Provider value={contexValue} >
        <MuiThemeProvider theme={theme} >
          {children}
        </MuiThemeProvider>
     </CustomThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(CustomThemeContext);

render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </StoreProvider>
  </ApolloProvider>,
    document.getElementById("root")
);

 