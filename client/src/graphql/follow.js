import { gql } from "@apollo/client";

export const CREATE_FOLLOW = gql`
    mutation($input: CreateFollowInput!){
        createFollow(input: $input){
            id
        }
    }
`

export const DELETE_FOLLOW = gql`
    mutation($input: DeleteFollowInput!){
        deleteFollow(input: $input){
            id
        }
    }
`