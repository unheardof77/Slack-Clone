import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import * as dotenv from 'dotenv'
dotenv.config()

const secret:any = process.env.SECRET;
const expiration = process.env.EXPIRATION;

interface authMiddlewareProp {
    req: any
}

interface signTokenProp {
    username: string
    ChatRooms: mongoose.Schema.Types.ObjectId[]
    friends: mongoose.Schema.Types.ObjectId[]
    _id: mongoose.Types.ObjectId
}


export const authMiddleware = function ({ req }:authMiddlewareProp) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    };

    if (!token) {
        return req;
    };

    try {
        const  data  = jwt.verify(token, secret, { maxAge: expiration });
        console.log(data);
        req.user = data;
    } catch {
        console.log('Invalid token');
    }

    return req;
}
export const signToken = function ({ username, ChatRooms, friends, _id }:signTokenProp) {
    const payload = { username, ChatRooms, friends, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
