import { ApolloServer } from 'apollo-server-express';

export const createApolloServer = (schema, resolverObject) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers: resolverObject
    })
};