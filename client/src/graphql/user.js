//disable-eslint
import { gql } from "@apollo/client"

export const SIGN_UP = gql`
  mutation($input: SignupInput!) {
    signup(input: $input) {
        signupToken
    }
  }
`

export const SIGN_IN = gql`
  mutation($input: SigninInput!) {
    signin(input: $input) {
      signinToken
    }
  }
`

export const REQUEST_PASS_RESET = gql`
  mutation($input: PassResetInput!){
    requestPassReset(input: $input){
      message
    }
  }
`