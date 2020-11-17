// That's the very root of the app
import React from 'react';
import { render } from 'react-dom';


import { ApolloProvider } from '@apollo/client';
// import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

// root component
import App from './components/App/App';
import { createApolloClient } from './utils/createApolloClient';

// store
import { StoreProvider } from './store/store';

const apiUrl = 'http://localhost:8080';

const apolloClient = createApolloClient(apiUrl);

render(
    <ApolloProvider client={apolloClient}>
          <StoreProvider>
            <App />
          </StoreProvider>
    </ApolloProvider>,
    document.getElementById("root")
  );