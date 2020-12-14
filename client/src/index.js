// That's the very root of the app
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './utils/createApolloClient';


// root component
import App from './components/App/App';

import { StoreProvider } from './store/store';
import { theme, palette } from './utils/theme';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const appTheme = createMuiTheme(palette)

// http and websockekt links
const apiUrl = "http://localhost:8080/graphql"
const webSocketApiUrl = "ws://localhost:8080/graphql"
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

