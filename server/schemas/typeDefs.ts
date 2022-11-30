import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Message {
        _id: ID
        user: ID
        message: String
        sentAt: String
    }

    type User {
        _id: ID
        username: String
        password: String
        ChatRooms: [ChatRoom]!
        friends: [User]!
    }

    type ChatRoom{
        _id: ID
        name: String
        members: [User]!
        messages: [Message]!
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        getChatRooms: [ChatRoom]
        getUser: User
    }

    type Mutation {
        login(username:String!, password:String!): Auth
        signup(username:String!, password:String!): Auth
    }

    type Subscription {
        onMessageSent(roomID: ID!, message:String!): ChatRoom
    }
`;

export default typeDefs;