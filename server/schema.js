import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`
    type Query{
        username: String
    }

    type Token{
        signupToken: String
        signinToken: String
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
        signup(input: SignupInput!): Token
        signin(input: SigninInput!): Token
    }

    input SignupInput{
        fullName: String!
        email: String!
        username: String!
        password: String!
    }

    input SigninInput{
        emailOrUsername: String!
        password: String!
    }
`