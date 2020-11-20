import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

/**
 * verify token
 * returns username and email if resolved
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
          let authenticatedUser;

          if(req.headers){
            const token = req.headers["x-social-key"];
           let user = await checkAuth(token);
          //  user will return if only the Promise has resolved
           if(user)
            authenticatedUser = user;
          }

            if (connection) { //we'll deal with connnecion later
              return Object.assign({}, models);
            }

            return Object.assign({authenticatedUser}, models);
          },
    })
};

// when the token is verified or decoded
// it returns the same values we signed
// in the user with.. Not all the fields
// jwt.verify(token, SECRET) -->{email:"", username:""}