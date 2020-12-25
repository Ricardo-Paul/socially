import { gql } from "@apollo/client";

export const GET_CONVERSATIONS = gql`
    query($authUserId: ID!){
        getConversations(authUserId: $authUserId){
            id
            username
            fullName
            isOnline
        }
    }
`