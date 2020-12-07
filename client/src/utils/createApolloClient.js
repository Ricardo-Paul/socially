import { ApolloClient, split } from '@apollo/client'; 
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

import { onError } from 'apollo-link-error';
import { createAuthLink } from './createAuthLink';

import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities'

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
 * @param {string} apiURL 
 * @param {string} webSocketApiUrl
 */
export const createApolloClient = (apiURL, webSocketApiUrl) => {
    const cache = new InMemoryCache();
    const authLink = createAuthLink();
    const token = localStorage.getItem("token");

    // websocket link
    const wsLink = new WebSocketLink({
        uri: webSocketApiUrl,
        options:{
            reconnect: true,
            connectionParams:{
                authorization: token
            }
        }
    })

    // the terminating link contains the apiUrl
    // it also creates an http link
    const uploadLink = createUploadLink({ uri: apiURL });


    // we're handling only subscriptions over webSocket
    const terminatingLink = split(({ query }) => {
        const definition = getMainDefinition(query);
        return(
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    }, 
    wsLink, //wsLink will be used if the function returns a truthy value
    uploadLink
    )

    // using myAuthLink for now inst
    return new ApolloClient({
        link: ApolloLink.from([handleErrors(), myAuthLink, terminatingLink]),
        cache
    });
}
// * the url is passed to createUpload link
// * as it the terminating one