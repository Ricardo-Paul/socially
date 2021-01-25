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
  palette: APP_THEMES[SELECTED_THEME]
});

const APP_THEMES = {
  [DARK_THEME]: {
    primary: {
      dark:"#000000",
      main: "#373737",
      light: "#545454",
      contrastText: "#e4e6eb"
  },
  secondary: {
      main: "#a7a6a6",
      dark: "#888584", //icons fill color
      light: "#d8d8d847"
    }
  },


  [LIGHT_THEME]: {
    primary: {
      dark:"#ffffff",
      main: "#000000",
      light: "",
      contrastText: ""
  },
  secondary: {
      main: "#a7a6a6",
      dark: "#888584", //icons fill color
      light: "#d8d8d847"
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

 