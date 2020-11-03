import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`

#-------------------------------------------------------
# QUERY ROOT && QUERIES
#-------------------------------------------------------
    type Query{
        username: String
        getAuthUser: User

        postname: String
        getPosts(authUserId: ID!): PostsPayload
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

        posts: [Post]
    }

    type Post {
        image: File  # set as string in the PayLoad
        imagePublicId: String
        title: String!
        author: User!
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

#-------------------------------------------------------
# PAYLOADS
#-------------------------------------------------------

type UserPayload{
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

    createdAt: String
    updatedAt: String

    posts: [Post]
}

type PostPayload{
    id: ID!
    title: String!
    image: File
    imagePublicId: String

    author: UserPayload!
}

type PostsPayload{
    posts: [PostPayload]
    count: String
}

#-------------------------------------------------------
# MUTATION ROOT && MUTATIONS
#-------------------------------------------------------
    type Mutation{
        signup(input: SignupInput!): Token
        signin(input: SigninInput!): Token
        requestPassReset(input: PassResetInput!): SuccessMessage
        resetPassword(input: ResetPasswordInput!): User

        createPost(input: CreatePostInput!): PostPayload
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
        image: Upload
        title: String!
        authorId: ID
    }

`