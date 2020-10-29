import { ApolloServer } from 'apollo-server-express';


export const createApolloServer = (schema, resolvers, models) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,
// the context object is used for auth
        context: async ({req, connection})=> {
            if(req){
                return Object.assign({}, models)
            }
        }
    })
};