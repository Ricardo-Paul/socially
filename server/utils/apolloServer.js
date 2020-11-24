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
          if(connection){
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
    })
};

// when the token is verified or decoded
// it returns the same values we signed
// in the user with.. Not all the fields
// jwt.verify(token, SECRET) -->{email:"", username:""}
