import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`
    type Query{
        username: String
    }

    type Token{
        token: String
    }

    type User{
        id: ID!
        fullName: String!
        email: String!
        username: String!
        password: String!
        image: String
        imagePublicId: String
        coverImage: String
        coverImagePublicId: String
        passwordResetToken: String
        passwordResetTokenExpiry: String
    }

    type Mutation{
        signup(input: SignupInput): User
    }

    input SignupInput{
        fullName: String!
        email: String!
        username: String!
        password: String!
    }
`
export const schemaTest = gql`
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