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