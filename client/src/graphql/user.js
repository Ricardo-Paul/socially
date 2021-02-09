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
    posts{
      id
    }
    conversations{
      id
      lastMessage
      fullName
      image
      isOnline
    }
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
      image
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
        id
        fullName
        username
        image
        followers{
          id
          follower
        }
        following{
          id
          follower
        }
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

export const GET_USER = gql`
  query($username: String, $userId: ID){
    getUser(username: $username, userId: $userId){
      id
      image
      username
      fullName
      isOnline
      posts{
        id
      }
      followers{
        id
        follower
      }
      following{
        id
        follower
      }
      posts{
        id
      }
    }
  }
` 

export const GET_USER_POSTS = gql`
  query($username: String!, $skip: Int, $limit: Int){
    getUserPosts(username: $username, skip: $skip, limit: $limit){
      count
      posts{
        id
        title
        image
        createdAt
        author{
          id
          fullName
          username
          image
          following{
            id
          }
          followers{
            id
          }
        }
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
        likes{
          id
          user{
            id
            image
            fullName
          }
        }
      }
    }
  }
`