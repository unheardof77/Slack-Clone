import mongoose, { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface userInt {
    username:string;
    password:string;
    ChatRooms:mongoose.ObjectId[];
    friends:mongoose.ObjectId[];
    _id:mongoose.Types.ObjectId
}
interface userMethods {
    isCorrectPassword(password:string): boolean;
};

type UserModel = Model<userInt, {}, userMethods>;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minLength: 7,
    },
    ChatRooms:[
        {
            type: Schema.Types.ObjectId,
            ref: 'ChatRoom'
        }
    ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.method('isCorrectPassword', async function isCorrectPassword(password:string) {
    return await bcrypt.compare(password, this.password);
});

const User = model<userInt, UserModel>('User', userSchema);

export default User;