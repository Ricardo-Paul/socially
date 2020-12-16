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
    id
    fullName
    email
    username
    image
    following{
      id
    }
    followers{
      id
    }
    likes{
      id
    }
    notifications{
      id
      sender{
        id
        fullName
        username
        image
      }
      follow{
        id
      }
      like{
        id
        post{
          id
          image
        }
      }
      comment{
        id
        post{
          id
          image
        }
      }
    }
  }
}
`
export const GET_USERS = gql`
query($userId: ID!, $skip: Int, $limit: Int){
  getUsers(userId: $userId, skip: $skip, limit: $limit){
    count
    users{
      id
      fullName
      username
      email
      following{
        id
        follower
      }
      followers{
        id
        follower
      }
    }
  }
}
`

export const SUGGEST_PEOPLE = gql`
  query($userId: ID!){
    suggestPeople(userId: $userId){
      count
      users{
        fullName
        username
        image
      }
    }
  }
`

export const UPLOAD_USER_PHOTO = gql`
  mutation($input:UploadUserPhotoInput!){
    uploadUserPhoto(input: $input){
      fullName
      username
      email
      image
    }
  }
`