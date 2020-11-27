import { gql } from '@apollo/client';

// mutations
export const CREATE_POST =gql`
    mutation($input: CreatePostInput!){
        createPost(input: $input){
            title
            id
        }
    }
`

// payloads
const postAuthorPayload = `
    author {
        id
        username
        image
        fullName
    }
`
const postCommentsPayload = `
comments {
    id
    comment
    author {
        id
        username
        fullName
        image
    }
}
`
const postLikePayload =`
    likes {
        id
        user
        post
    }
`

// queries
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
                ${postAuthorPayload}
                ${postCommentsPayload}
            }
        }
    }
`