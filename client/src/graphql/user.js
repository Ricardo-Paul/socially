import { gql } from "@apollo/client"


export const SIGN_UP = gql`
  mutation($input: SignupInput!) {
    signup(input: $input) {
        signupToken
    }
  }
`
export const MUT = gql`
mutation($input: SignupInput!){
    signup(input: $input){
      signupToken
    }
  }
`