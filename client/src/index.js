// That's the very root of the app
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';

// root component
import App from './components/App/App';
import { createApolloClient } from './utils/createApolloClient';

import { StoreProvider } from './store/store';
import { theme } from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core';

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

