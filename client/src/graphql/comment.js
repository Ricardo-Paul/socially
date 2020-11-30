import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
    mutation($input: CreateCommentInput!){
        createComment(input: $input){
            id
        }
    }
`

export const DELETE_COMMENT = gql`
    mutation($input: DeleteCommentInput!){
        deleteComment(input: $input){
            id
        }
    }
`