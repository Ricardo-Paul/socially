import { ApolloClient } from '@apollo/client'; 
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

import { onError } from 'apollo-link-error';
import { createAuthLink } from './createAuthLink';
/**
 * error handling function
 */
const handleErrors = () => {
    return onError(({graphQLErrors, networkError}) => {
        if(graphQLErrors){
            console.log(`graphQLErrors: ${graphQLErrors}`);
        }
        if(networkError){
            console.log(`Network Error: ${networkError}`);
        }
    })
}
// 
/**
 * create a apollo client
 *
 * @param {string} apiURL 
 */
export const createApolloClient = (apiURL) => {
    const cache = new InMemoryCache();
    const authLink = createAuthLink();

    const uploadLink = createUploadLink({
        uri: apiURL
    });

    // the auth link middleware is causing trouble
    // leave out for a moment
    return new ApolloClient({
        link: ApolloLink.from([handleErrors(), uploadLink]),
        cache
    });
}
// * the url is passed to createUpload link
// * as it the terminating one