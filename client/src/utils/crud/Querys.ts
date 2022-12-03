import { gql } from "@apollo/client";

export const getUserNameChatRoom = gql`
query Query {
  getUser {
    _id
    username
    ChatRooms {
      name
      _id
      isPrivateMessage
    }
  }
}
`;