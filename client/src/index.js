// That's the very root of the app
import React from 'react';
import { render } from 'react-dom';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

// root component
import App from './components/App/App';
import { createApolloClient } from './utils/createApolloClient';

import { StoreProvider } from './store/store';
import { theme } from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core';

const uri = "http://localhost:8080/graphql"

const testClient = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

const client = createApolloClient(uri);

render(
  // <ApolloHooksProvider client={client}>
  <MuiThemeProvider theme={theme}>
   <ApolloProvider client={client}>
      <StoreProvider>
            <App />
        </StoreProvider>
    </ApolloProvider>
  </MuiThemeProvider>,
  // </ApolloHooksProvider>,
    document.getElementById("root")
  );

