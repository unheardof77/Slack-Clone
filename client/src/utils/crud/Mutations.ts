import { gql } from "@apollo/client";

export const SIGNUP = gql`
mutation Mutation($username: String!, $password: String!) {
  signup(username: $username, password: $password) {
    token
    user {
      _id
    }
  }
}
`;