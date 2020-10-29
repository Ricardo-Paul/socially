import { ApolloServer } from 'apollo-server-express';


export const createApolloServer = (schema, resolvers, models) => {
    return new ApolloServer({
        typeDefs: schema,
        resolvers,

        context: async ({req, connection})=> {
            if(connection){
                console.log(models, 'models returned')
                return Object.assign({}, models)
            }
            if(req){
                return Object.assign({}, models)
            }
        }
    })
};