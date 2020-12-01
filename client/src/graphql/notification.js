import { gql } from '@apollo/client';


export const GET_USER_NOTIFICATIONS = gql`
    query($userId:ID!, $skip:Int, $limit:Int){
        getUserNotifications(userId: $userId, skip:$skip, limit:$limit){
            count
            notifications
        }
    }
`

export const CREATE_NOTIFICATION = gql`
    mutation($input: CreateNotificationInput!){
        createNotification(input: $input){
            id
        }
    }
`

export const DELETE_NOTIFICATION = gql`
    mutation($input: DeleteNotificationInput!){
        deleteNotification(input: $input){
            id
        }
    }
`