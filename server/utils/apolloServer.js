import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';


const checkAuthorization = (token) => {
    return new Promise(async (resolve, reject) => {
      const authenticatedUser = await jwt.verify(token, process.env.SECRET);
  
      if (authenticatedUser) {
        resolve(authenticatedUser);
      } else {
        reject("Couldn't authenticate user");
      }
    });
  };


export const createApolloServer = (schema, resolvers, models) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req, connection }) => {
            if (connection) {
            //   return connection.context;
              return Object.assign({}, models);
            }
      
            // let authenticatedUser;
            // if (req.headers.authorization !== 'null') {
            //   const user = await checkAuthorization(req.headers['authorization']);
            //   if (user) {
            //     authenticatedUser = user;
            //   }
            // }
      
            return Object.assign({}, models);
          },
    })
};

// when the token is verified or decoded
// it returns the same values we signed
// in the user with.. Not all the fields
// jwt.verify(token, SECRET) -->{email:"", username:""}