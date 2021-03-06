import { gql } from "@apollo/client";

export const GET_CONVERSATIONS = gql`
    query($authUserId: ID!){
        getConversations(authUserId: $authUserId){
            id
            image
            username
            fullName
            isOnline
            seen
            lastMessage
            lastMessageSender
            lastMessageCreatedAt
        }
    }
`

export const GET_MESSAGES = gql`
 query($authUserId: ID!, $userId: ID!){
     getMessages(authUserId: $authUserId, userId: $userId){
         message
         sender
         receiver
         createdAt
         seen
     }
 }
`

export const CREATE_MESSAGE = gql`
 mutation($input: CreateMessageInput!){
     createMessage(input: $input){
         message
         sender
         createdAt
         receiver
         seen
     }
 }
`

export const GET_NEW_CONVERSATIONS = gql`
    subscription{
        newConversation{
            id
            username
            fullName
            image
            isOnline
            lastMessage
            lastMessageCreatedAt
            lastMessageSender
            seen
        }
    }
`

export const GET_NEW_MESSAGE = gql`
    subscription($authUserId: ID!, $userId: ID!){
        messageCreated(authUserId: $authUserId, userId: $userId){
           message
           createdAt
        }
    }
`

export const UPDATE_MESSAGE_SEEN = gql`
    mutation($input: UpdateMessageSeenInput!){
        updateMessageSeen(input: $input)
    }
`

export const UPDATE_ALL_MESSAGES_AS_SEEN = gql`
    mutation($input: UpdateAllMessagesAsSeenInput!){
        updateAllMessagesAsSeen(input: $input)
    }
`