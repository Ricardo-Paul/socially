import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createApolloServer } from './utils/apolloServer';
import { gql } from 'apollo-server-express';

const app = express();
app.use(cors());

const dbName = "sociallydb";
const mongoURL = `mongodb://127.0.0.1/${dbName}`;

// apollo server
const schema = gql`
# we can query field fullName on type User
    type User {
        fullName: String
        username: String
        city: String
    }


# field we can query on type Query (users)
# the uppermost level

    type Query{
        users: [User]
    }
`
// use mongo db models as users
const users = [{
    username: "Ricardo",
    city: "PetionVille",
    fullName: "Ricardo Paul"
}]


const resolverObject = {
    Query: {
        users: () => users
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