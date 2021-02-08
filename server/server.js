import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createApolloServer } from './utils/apolloServer';

import resolvers from './resolvers';
import models from './models';
import { schema } from './schema';

import { createServer } from 'http'; //our http server

const app = express();
app.use(cors());

// env var
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const HOST =   process.env.HOST;

const LOCAL_DB = `${MONGO_URL}/${DB_NAME}`;
const MONGODB_URL = process.env.MONGODB_URL;
const isDev = process.env.NODE_ENV === 'development'

// ditch the resolver object by passing the
// resolvers as an array

// const resolverObject = {
//     Mutation: {
//         signup
//     }
// }

// create an http server
const httpServer = createServer(app);

const apolloServer = createApolloServer(schema, resolvers, models);
apolloServer.applyMiddleware({ app })

// add Subscription handler to our apolloServer
apolloServer.installSubscriptionHandlers(httpServer);



// now we're listening to the httpServer rather than app
httpServer.listen({ port: process.env.PORT || 8000}, () => {
    console.log(`API is running on port: ${HOST}${PORT}
    graphQL Playground: ${HOST}${PORT}/${apolloServer.graphqlPath}

    Subscriptions: ${'ws://'}${PORT}/${apolloServer.subscriptionsPath}
    `)
})

app.get('/', (req, res) => {
    res.send('Deployed')
})

//change local_db to mongodb for prod..
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`API Connected to the databse: ${DB_NAME}`)
})
.catch(err => console.error(err))