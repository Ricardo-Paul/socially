import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`

#-------------------------------------------------------
# QUERY ROOT && QUERIES
#-------------------------------------------------------
    type Query{
        username: String
        getLoggedInUser: User

        postname: String
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

    type Post {
        image: String
    }

#-------------------------------------------------------
# MUTATION ROOT && MUTATIONS
#-------------------------------------------------------
    type Mutation{
        signup(input: SignupInput!): Token
        signin(input: SigninInput!): Token
        requestPassReset(input: PassResetInput!): SuccessMessage
        resetPassword(input: ResetPasswordInput!): User

        createPost(input: CreatePostInput!): String
    }

    type TestMessage {
        title: String!
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

    input ResetPasswordInput{
        email: String!
        passwordResetToken: String!
        password: String!
    }

    input SigninInput{
        emailOrUsername: String!
        password: String!
    }

    input PassResetInput{
        email: String!
    }

    #----------------------------------------
    # POST INPUTS
    #----------------------------------------

    input CreatePostInput {
        image: Upload!
        title: String
    }


`