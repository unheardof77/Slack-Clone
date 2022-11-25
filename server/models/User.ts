import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.methods.isCorrectPassword = function (password:string) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;