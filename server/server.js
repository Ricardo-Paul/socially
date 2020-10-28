import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createApolloServer } from './utils/apolloServer';
import { gql } from 'apollo-server-express';

const app = express();
app.use(cors());

const dbName = "sociallydb";
const mongoURL = `mongodb://127.0.0.1/${dbName}`;

// models (once the program hit that line)
// it creates the users collection
// 
import models from './models';
const { User } = models;


// const newUser = new User({
//     fullName: 'Newton',
//     email: 'newtonisac@gmail.com'
// }).save();

// if(newUser){
//     console.log('New user created')
// }
// User
// apollo server
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
const PORT = '8080'
app.listen(PORT, ()=>{
    console.log('app is running on port', PORT+apolloServer.graphqlPath);
})

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('DB connected')
})
.catch(err => console.error(err))