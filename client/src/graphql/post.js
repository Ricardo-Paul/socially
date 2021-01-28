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

export const DELETE_POST = gql`
    mutation($input: DeletePostInput!){
        deletePost(input: $input){
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
        followers{
            id
            follower
            following
        }
        notifications {
            id
            seen
            like{
             id
            }
            comment{
             id
            }
            follow{
             id
            }
        }
    }
`
const postCommentsPayload = `
comments {
    id
    comment
    createdAt
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
        user{
         id
         fullName
        }
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
                ${postLikePayload}
            }
        }
    }
`

export const GET_POST = gql`
    query($id:ID!){
        getPost(id: $id){
            id
            createdAt
            image
            title
            comments{
                id
                createdAt
                comment
                author{
                    id
                    image
                    fullName
                }
            }
            author{
                id
                image
                fullName
                username
            }
            likes{
                id
                user{
                    id
                }
            }
        }
    }
`