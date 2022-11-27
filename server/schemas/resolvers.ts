import { AuthenticationError } from "apollo-server-express";
import User from "../models/User";
import ChatRoom from "../models/ChatRoom";
import { signToken } from '../utils/auth'
import {userInt} from '../models/User';
interface Args {
    username:string;
    password:string;
}

interface Context {
    user: userInt
}

const resolvers = {
    Query:{
        getChatRooms: async (_:any, __:any, context:Context) => {
            return await ChatRoom.find({members: context.user._id}).populate('members').populate('messages');
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
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    },
    Subscription:{
        messageSent: () => {}
    }
};

export default resolvers;