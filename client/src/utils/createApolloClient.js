import { ApolloClient } from '@apollo/client'; 
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

import { onError } from 'apollo-link-error';
import { createAuthLink } from './createAuthLink';

import { setContext } from '@apollo/client/link/context';


// a partial solution while I don't debug {createAuthLink}
const myAuthLink = setContext((_,{ headers }) => {
    const token = localStorage.getItem("token");
    if(!token){
        return;
    }
    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
});


/**
 * error handling function
 * boilerplate provided by the onError link itself
 */

const handleErrors = () => {
    return onError(({graphQLErrors, networkError}) => {
        if(graphQLErrors){
            console.log(`graphQLErrors: ${graphQLErrors[0].message}`);
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

    // using myAuthLink for now inst
    return new ApolloClient({
        link: ApolloLink.from([handleErrors(), myAuthLink, uploadLink]),
        cache
    });
}
// * the url is passed to createUpload link
// * as it the terminating one