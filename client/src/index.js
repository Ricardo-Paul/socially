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

const uri = "http://localhost:8080/graphql"

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  cache: new InMemoryCache()
});

const c = createApolloClient(uri);

render(
  <ApolloHooksProvider client={client}>
    <ApolloProvider client={client}>
          <StoreProvider>
            <App />
          </StoreProvider>
    </ApolloProvider>
  </ApolloHooksProvider>,
    document.getElementById("root")
  );

