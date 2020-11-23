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

export const VERIFY_RESET_PASSWORD_TOKEN = gql`
  query($email: String!, $token: String!){
    verifyResetPasswordToken(email: $email, token: $token){
      message
    }
  }
`

export const RESET_PASSWORD = gql`
mutation ($input: ResetPasswordInput!){
  resetPassword(input: $input){
    token
  }
}
`

export const GET_AUTH_USER = gql`
query{
  getAuthUser{
    fullName
    email
    username
  }
}
`