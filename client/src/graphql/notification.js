import { gql } from '@apollo/client';

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