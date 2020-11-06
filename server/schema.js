import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`

#-------------------------------------------------------
# QUERY ROOT && QUERIES
#-------------------------------------------------------
    type Query{
        username: String
        getComment: String
        getLike: String

        getAuthUser: User

        postname: String
        getPosts(authUserId: ID!, skip:Int, limit:Int): PostsPayload
        getPost(id: ID!): PostPayload
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
        comments: [Comment]
    }

    type Post{
        image: File  # set as string in the PayLoad
        imagePublicId: String
        title: String!
        author: User!
    }

    type Comment{
        authorId: ID!
        postId: ID!
        comment: String!
    }

    type Like{
        post: ID!
        user: ID!
    }

    type File{
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

    posts: [PostPayload]
    comments: [CommentPayload]
    likes: [Like]
}

type PostPayload{
    id: ID!
    title: String!
    image: File
    imagePublicId: String

    author: UserPayload
    comments: [CommentPayload]
    likes: [Like] #Like has no payload for now
}

type CommentPayload{
    authorId: ID!
    postId: ID!
    comment: String!
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
        deletePost(id: ID!): String

        createComment(input: CreateCommentInput!): CommentPayload

        createLike(input: CreateLikeInput!): Like
    }

    type TestMessage{
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

    input CreateCommentInput{
        authorId: ID!
        postId: ID!
        comment: String!
    }

    input CreateLikeInput{
        postId: ID!
        userId: ID!
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