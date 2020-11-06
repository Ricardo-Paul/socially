import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';


export const createApolloServer = (schema, resolvers, models) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,
// the context object is used for auth
        context: async ({req, connection})=> {
        if(req){
            if(req.headers){
                // TODO: verify token expiry date
                const token = req.headers["x-social-key"];
                const  authenticatedUser = jwt.verify(token, process.env.SECRET);
                    return Object.assign({authenticatedUser}, models)
                }

                return Object.assign({}, models);
            }
        }
    })
};

// when the token is verified or decoded
// it returns the same values we signed
// in the user with.. Not all the fields
// jwt.verify(token, SECRET) -->{email:"", username:""}