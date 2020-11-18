import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createApolloServer } from './utils/apolloServer';

import resolvers from './resolvers';
import models from './models';
import { schema } from './schema';


const app = express();
app.use(cors());

// env var
const API_PORT = process.env.API_PORT;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const HOST =   process.env.HOST;

// ditch the resolver object by passing the
// resolvers as an array

// const resolverObject = {
//     Mutation: {
//         signup
//     }
// }

const apolloServer = createApolloServer(schema, resolvers, models);
apolloServer.applyMiddleware({ app })
const PORT='4444'
// API_PORT
// express sever
app.listen(PORT, ()=>{
    console.log(`API is running on port: ${HOST}${PORT}
    graphQL Playground: ${HOST}${PORT}/${apolloServer.graphqlPath}
    `);
})

mongoose.connect(`${MONGO_URL}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`API Connected to the databse: ${DB_NAME}`)
})
.catch(err => console.error(err))