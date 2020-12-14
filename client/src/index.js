// That's the very root of the app
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './utils/createApolloClient';


// root component
import App from './components/App/App';

import { StoreProvider } from './store/store';
import { MuiThemeProvider } from '@material-ui/core';
import { getMuiTheme } from './utils/getMuiTheme';

const SELECTED_COLOR_SCHEME = 'LIGHT';
const theme = getMuiTheme(SELECTED_COLOR_SCHEME);

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

