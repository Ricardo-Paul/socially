import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`

#-------------------------------------------------------
# QUERY ROOT
#-------------------------------------------------------
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
        passwordResetTokenExpiryDate: String
    }

#-------------------------------------------------------
# MUTATION
#-------------------------------------------------------

    type Mutation{
        signup(input: SignupInput!): Token
        signin(input: SigninInput!): Token
        requestPassReset(input: PassResetInput!): SuccessMessage
    }

    type SuccessMessage{
        message: String
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

    input PassResetInput{
        email: String!
    }


`