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