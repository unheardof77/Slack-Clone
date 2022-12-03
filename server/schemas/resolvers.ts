import { AuthenticationError } from "apollo-server-express";
import User from "../models/User";
import ChatRoom from "../models/ChatRoom";
import { signToken } from '../utils/auth'
import {userInt} from '../models/User';
import mongoose from "mongoose";
import Message from "../models/Message";
interface Args {
    username:string;
    password:string;
}

interface Context {
    user: userInt;
}

interface messageSentSub {
    _id:mongoose.Types.ObjectId;
}

interface CreateChatRoom {
    name: string;
    members:mongoose.Types.ObjectId[];
}

interface SendMessage {
    message: string;
    roomId: mongoose.Types.ObjectId
}
//need to add querys for messages and chatrooms
const resolvers = {
    Query:{
        getChatRooms: async (_:any, __:any, context:Context) => {
            return await ChatRoom.find({members: context.user._id}).populate('members').populate('messages');
        },
        getOneChatRoom: async (_:any, {_id}:messageSentSub, context:Context) => {
            return await ChatRoom.findById(_id).populate('members').populate('messages');
        },
        getUser: async (_:any, __:any, context:Context) => {
            return await User.findById(context.user._id).populate('friends').populate('ChatRooms')
        }

    },
    Mutation:{
        signup: async (_:any, args:Args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { user, token };
        },
        login: async (_:any, { username, password }:Args) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('No account found.');
            }

            const correctPw = user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addFriend: async (_:any, {_id}:messageSentSub, context:Context) =>{
            const user = await User.findOneAndUpdate({_id:context.user._id},{$addToSet: {friends: _id}}, {new: true});
            return user;
        },
        removeFriend: async (_:any, {_id}:messageSentSub, context:Context) => {
            const user = await User.findOneAndUpdate({_id:context.user._id},{$pull: {friends: _id}}, {new: true});
            return user;
        },
        createChatRoom: async (_:any, {name, members}:CreateChatRoom) => {
            return await ChatRoom.create({name: name, members:[...members]});
        },
        sendMessage: async (_:any, {message, roomId}:SendMessage, context:Context) =>{
            const newMessage = await Message.create({message: message, user: context.user._id});
            return await ChatRoom.findOneAndUpdate({_id: roomId}, {$addToSet: {messages: newMessage._id}}, {new: true})
        }
    },
    Subscription:{
        onMessageSent: async (_:any, args:messageSentSub, context:Context ) => {
            return await ChatRoom.findById(args._id).populate('members').populate('messages');
        }//querys for all messages in the chatroom
    }
};

export default resolvers;