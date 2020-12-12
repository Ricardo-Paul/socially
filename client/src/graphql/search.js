import { gql } from "@apollo/client";

export const SEARCH_USERS = gql`
    query($searchQuery: String!){
        searchUsers(searchQuery: $searchQuery){
            fullName
            username
        }
    }
`