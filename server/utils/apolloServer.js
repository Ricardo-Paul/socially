import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import{ PubSub } from 'apollo-server';

// create a new PubSub instance to publish events
export const pubSub = new PubSub();

/**
 * verify token
 * authUser is an object of email and username
 * 
 * @param {*} token 
 */
const checkAuth = (token) => {
  return new Promise((resolve, reject) => {
    let authUser = jwt.verify(token, process.env.SECRET);
    if(authUser){
      resolve(authUser)
    }
    reject(`Authentication failed`)
  })
}

export const createApolloServer = (schema, resolvers, models) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req, connection }) => {
          if(connection){
            console.log('CON CONTEXT :',connection.context);
            return connection.context;
          }
         // console.log('HEADERS API :',req.headers.authorization);
          let bool = Boolean(req.headers.authorization);
        //  console.log('BOOL ', bool);
          if(bool){
           // console.log('headers present')
            const token = req.headers.authorization;
            let user = await checkAuth(token);
            if(user){
              let authenticatedUser = user;
              return Object.assign({authenticatedUser}, models);
             }
          } else {
      //      console.log('no headers')
            return Object.assign({}, models);
          };

          return Object.assign({}, models);
        },

        subscriptions:{
          onConnect: async (connectionParams, WebSocket) => {
            if(connectionParams.authorization){
              let user = await checkAuth(connectionParams.authorization);
              let authenticatedUser;
              if(user) authenticatedUser = user;

              // place the authenticated user in the connection context
              return {authenticatedUser}
            }
          }
        }
    })
};

// when the token is verified or decoded
// it returns the same values we signed
// in the user with.. Not all the fields
// jwt.verify(token, SECRET) -->{email:"", username:""}
