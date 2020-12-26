import { gql } from 'apollo-server-express';
// non-null fields !

export const schema = gql`
#-------------------------------------------------------
# QUERY ROOT && QUERIES
#-------------------------------------------------------
    type Query{
        getAuthUser: UserPayload
        getUser(username: String!): UserPayload
        verifyResetPasswordToken(email: String!, token: String!): SuccessMessage
        postname: String
        getPosts(authUserId: ID!, skip:Int, limit:Int): PostsPayload
        getPost(id: ID!): PostPayload
        getFollowedPosts(userId: ID!, skip:Int, limit:Int): PostsPayload
        getUserPosts(userId: ID!, skip: Int, limit: Int): PostsPayload
        getUsers(userId: ID!, skip:Int, limit:Int): UsersPayload
        searchUsers(searchQuery: String): [UserPayload]
        suggestPeople(userId: ID!): UsersPayload
        getUserNotifications(userId:ID!, skip:Int, limit:Int): NotificationsPayload

        getMessages(authUserId:ID!, userId:ID!): [Message]
        getConversations(authUserId: ID!): [ConversationsPayload]
    }

    type ConversationsPayload{
        id: ID!
        username: String!
        fullName: String!
        lastMessage: String!
        image: String
        isOnline: Boolean
        seen: Boolean
        lastMessageSender: Boolean
    }
    type NotificationsPayload{
        notifications: [Notification]
        count: String
    }
    type UsersPayload{
        users: [UserPayload]
        count: String!
    }
    type Token{
        signupToken: String
        signinToken: String
        token: String
    }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
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
        notifications:[Notification]
        isOnline: Boolean
        messages: [Message]
    }
    type Post{
        id: ID!
        image: File  # set as string in the PayLoad
        imagePublicId: String
        title: String!
        author: User!
    }
    type Comment{
        id: ID!
        authorId: ID!
        postId: ID!
        comment: String!
    }
    type Like{
	    id: ID!
        post: PostPayload
        user: UserPayload
    }
    type Follow{
        id: ID!
        following: ID!
        follower: ID!
    }
    type Notification{
        id: ID!
        sender: User!
        receiver: User!
        
        post: PostPayload
        like: Like
        comment: CommentPayload
        follow: Follow
        seen: Boolean
        createdAt: String
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
    following: [Follow]
    followers: [Follow]
    notifications: [Notification]

    isOnline: Boolean
    messages: [Message]
}
type PostPayload{
    id: ID!
    title: String!
    image: String
    imagePublicId: String
    createdAt: String
    author: UserPayload
    comments: [CommentPayload]
    likes: [Like]
}
type CommentPayload{
    id: ID!
    author: UserPayload
    post: PostPayload
    comment: String!
}
type PostsPayload{
    posts: [PostPayload]
    count: String!
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
        uploadUserPhoto(input: UploadUserPhotoInput!): UserPayload

        requestPassReset(input: PassResetInput!): SuccessMessage
        resetPassword(input: ResetPasswordInput!): Token

        createPost(input: CreatePostInput!): PostPayload
        deletePost(input: DeletePostInput!): PostPayload

        createComment(input: CreateCommentInput!): CommentPayload
        deleteComment(input: DeleteCommentInput): CommentPayload

        createLike(input: CreateLikeInput!): Like
        deleteLike(input: DeleteLikeInput!): Like

        createFollow(input: CreateFollowInput): Follow
        deleteFollow(input: DeleteFollowInput): Follow

        deleteNotification(input: DeleteNotificationInput): Notification
        createNotification(input: CreateNotificationInput): Notification
        updateNotificationSeen(input: UpdateNotificationInput!): Boolean

        createMessage(input: CreateMessageInput!): Message
        deleteMessage(input: DeleteMessageInput!): Message
    }

    type Message{
        id: ID!
        sender: ID!
        receiver: ID!
        seen: Boolean
        message: String
        createdAt: String
        updatedAt: String
    }

    type TestMessage{
        title: String!
    }
    type SuccessMessage{
        message: String
    }
    input DeletePostInput {
	id: ID!
	imagePublicId: ID
   }



#-------------------------------------------------------
# INPUTS
#-------------------------------------------------------

   input CreateMessageInput{
     sender: ID!
     receiver: ID!
     message: String!
   }

   input DeleteMessageInput{
     messageId: ID!
   }

    input UploadUserPhotoInput{
        userId: ID!
        image: Upload!
        imagePublicId: String
        isCover: Boolean
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
        authorId: ID!
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
#-------------------------------------------------------
# SUBSCRIPTIONS
#-------------------------------------------------------
enum NotificationOperationType{
    CREATE
    DELETE
}
type NotificationCreatedOrDeletedPayload{
    operation: NotificationOperationType!
    notification: Notification
}

type MessageCreatedPayload{
        id: ID
    }

type NewConversationPayload{
    id: ID
}

 type Subscription{
    notificationCreatedOrDeleted: NotificationCreatedOrDeletedPayload
    messageCreated: MessageCreatedPayload
    newConversation: NewConversationPayload
 }
`