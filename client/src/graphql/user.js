import gql from "graphql-tag";

export const SIGNUP = gql`
    mutation($input: SignupInput!){
        signup(input: $input){
            signupToken
        }
    }
`