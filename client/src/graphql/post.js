import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation($input: CreatePostInput!){
        createPost(input: $input){
            title
            id
        }
    }
`
// userId: String! (useId: ID! in schema)
export const GET_FOLLOWED_POSTS = gql`
    query($userId: ID!, $skip: Int, $limit: Int){
        getFollowedPosts(userId: $userId, skip: $skip, limit: $limit){
            count
            posts {
                id
                title
                image
                imagePublicId
                createdAt
            }
        }
    }
`