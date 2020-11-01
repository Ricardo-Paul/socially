import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';


export const createApolloServer = (schema, resolvers, models) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,
// the context object is used for auth
        context: async ({req, connection})=> {
            if(req){
                if(req.headers){
                    const token = req.headers["authorization"];

                   const  loggedInUser = jwt.decode(token, process.env.SECRET)
                    return Object.assign({loggedInUser}, models)
                }

                return Object.assign({}, models)
            }
        }
    })
};

// when the token is verified or decoded
// it returns the same values we signed
// in the user with.. Not all the fields
// jwt.verify(token, SECRET) -->{email:"", username:""}