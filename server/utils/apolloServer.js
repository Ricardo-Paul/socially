import { ApolloServer } from 'apollo-server-express';


export const createApolloServer = (schema, resolvers) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers
    })
};