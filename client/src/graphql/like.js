import { gql } from '@apollo/client';

export const CREATE_LIKE = gql`
    mutation($input: CreateLikeInput!){
        createLike(input: $input){
            id
        }
    }
`
export const DELETE_LIKE = gql`
    mutation($input: DeleteLikeInput!){
        deleteLike(input: $input){
            id
        }
    }
`