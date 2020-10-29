import { gql } from 'apollo-server-express';
// non-null fields !

const schema1 = gql`
    type Token{
        token: String
    }

    type User{
        id: ID!
        fullName: String!
        email: String!
        username: String!
        password: String!
    }

    type Mutation{
        signup(input: SignupInput): Token
    }

    input SignupInput{
        fullName: String!
        email: String!
        username: String!
        password: String!
    }
`
export const schema = gql`
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