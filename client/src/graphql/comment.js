import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
    mutation($input: CreateCommentInput!){
        createComment(input: $input){
            id
        }
    }
`