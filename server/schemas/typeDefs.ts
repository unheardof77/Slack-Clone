import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Message {
        _id: _id
        user: _id
        message: String
        sentAt: Date
    }

    type User {
        _id: _id
        username: String
        password: String
        ChatRooms: [ChatRoom]!
        friends: [User]!
    }

    type ChatRoom{
        _id: _id
        name: String
        members: [User]!
        messages: [Message]!
    }
    type Subscription {
        messageSent(roomID: _id!, message:string!): Chatroom
    }
`;

export default typeDefs;