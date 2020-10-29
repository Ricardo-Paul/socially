import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createApolloServer } from './utils/apolloServer';
import { gql } from 'apollo-server-express';

const app = express();
app.use(cors());

// env var
const API_PORT = process.env.API_PORT;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const HOST =   process.env.HOST;


// models (once the program hit that line)
// it creates the users collection
// 
import models from './models';
const { User } = models;

const schema = gql`
    type Query{
        users: [User]
    }

    type User{
        fullName: String
        email: String
    }

    input SignupInput{
        fullName: String
        email: String
    }

    type Mutation{
        signup(input: SignupInput): User
    }
`
// use mongo db models as users
const users = [{
    username: "Ricardo",
    city: "PetionVille",
    fullName: "Ricardo Paul"
}]

import userResolver from './resolvers/userResolver'
const { Mutation: { signup } } = userResolver;
const resolverObject = {
    Query: {
        users: () => users
    },
    Mutation: {
        signup
    }
}

const apolloServer = createApolloServer(schema, resolverObject);
apolloServer.applyMiddleware({ app })

// express sever
app.listen(API_PORT, ()=>{
    console.log(`API is running on port: ${HOST}${API_PORT}
    graphQL Playground: ${HOST}${API_PORT}/${apolloServer.graphqlPath}
    `);
})

mongoose.connect(`${MONGO_URL}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log(`API Connected to the databse: ${DB_NAME}`)
})
.catch(err => console.error(err))