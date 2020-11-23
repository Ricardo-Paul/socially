import { gql } from '@apollo/client';


export const CREATE_POST = gql`
    mutation($input: CreatePostInput!){
        createPost(input: $input){
            title
            id
        }
    }
`