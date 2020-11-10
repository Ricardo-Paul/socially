import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`

#-------------------------------------------------------
# QUERY ROOT && QUERIES
#-------------------------------------------------------
    type Query{
        getAuthUser: User
        getUser(username: String!): UserPayload

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
        id: ID!
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

    type Follow{
        following: ID!
        follower: ID!
    }

    type Notification{
        id: ID!
        sender: User!
        receiver: User!
        
        post: ID!

        like: Like
        comment: Comment
        follow: Follow

        seen: Boolean
        createdAt: String
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
    likes: [Like]
}

type CommentPayload{
    author: ID!
    post: ID!
    comment: String!
}

type PostsPayload{
    posts: [PostPayload]
    count: String
}

enum NotificationType{
    COMMENT
    LIKE
    FOLLOW
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
        deleteComment(input: DeleteCommentInput): CommentPayload

        createLike(input: CreateLikeInput!): Like
        deleteLike(input: DeleteLikeInput!): Like

        createFollow(input: CreateFollowInput): Follow
        deleteFollow(input: DeleteFollowInput): Follow

        deleteNotification(input: DeleteNotificationInput): Notification
        createNotification(input: CreateNotificationInput): Notification
        updateNotificationSeen(input: UpdateNotificationInput!): Boolean
    }

    type TestMessage{
        title: String!
    }

    type SuccessMessage{
        message: String
    }

    input DeleteNotificationInput{
        notificationId: ID!
    }

    input CreateNotificationInput{
        receiverId: ID!
        senderId: ID!
        postId: ID!
        notificationType: NotificationType!
        notificationTypeId: ID
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

    input DeleteLikeInput{
        likeId: ID!
    }

    input DeleteCommentInput{
        commentId: ID!
    }

    input CreateFollowInput{
        currentUserId: ID!
        followedUserId: ID!
    }

    input DeleteFollowInput{
        followId: ID!
    }

    input UpdateNotificationInput{
        receiverId: ID!
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