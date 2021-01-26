// That's the very root of the app
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './utils/createApolloClient';


// root component
import App from './components/App/App';
import { StoreProvider } from './store/store';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { themes } from './constants/AppTheme';
const { DARK_THEME, LIGHT_THEME, DEFAULT_THEME } = themes;

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

const APP_THEMES = {
  [DARK_THEME]: {
    primary: {
      dark:"#18191A", // 
      main: "#242526", // dark_background
      light: "#424242", // light_background
      contrastText: "#bbbbba" // text_color
  },
  secondary: {
      main: "#a7a6a6",
      dark: "#888584", //icons fill color
      light: "#d8d8d847",
    },
  shape: {
    borderRadius: "0.5rem",
    inputBorderRadius: "1.5rem"
  },
  custom: {
    palette: {
      drawerBackground: "#333333",
      paleNuance: "#2f2e2e",
      helperText: "#a9482a",
      likeColor: "#0b80ef"
    },
    drawerWidth: 300,
    peopleBoxWidth: 450,
    boxShadow: "0px 4px 9px 0px #0c0c0c"
  }
},

  [LIGHT_THEME]: {
    primary: {
      dark:"#f3f3f3",
      main: "#ffffff",
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
      inputBorderRadius: "1.5rem"
    },
  custom: {
      palette: {
        drawerBackground: "#191919",
        paleNuance: "#2f2e2e",
        helperText: "#a9482a",
        likeColor: "#0b80ef"
      },
      drawerWidth: 300,
      peopleBoxWidth: 450,
      boxShadow: "0px 4px 2px 0px #0c0c0c"
    }
  }
}

let theme;

const SELECTED_THEME = localStorage.getItem("theme");
if(!SELECTED_THEME){
  theme = getMuiTheme(DEFAULT_THEME);
  localStorage.setItem("theme", DEFAULT_THEME)
}

if(SELECTED_THEME === DARK_THEME || SELECTED_THEME === LIGHT_THEME ){
  theme = getMuiTheme(SELECTED_THEME)
  localStorage.setItem("theme", SELECTED_THEME)
}

// http and websockekt links
const apiUrl = "http://localhost:8080/graphql";
const webSocketApiUrl = "ws://localhost:8080/graphql";
const client = createApolloClient(apiUrl, webSocketApiUrl);

render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <StoreProvider>
            <App />
        </StoreProvider>
    </MuiThemeProvider>
  </ApolloProvider>,
    document.getElementById("root")
  );

 