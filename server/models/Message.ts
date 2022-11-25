import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type: String,
        required: true,
        trim: true
    },
    sentAt:{
        type: Date,
        default: Date.now
    }
});

const Message = model('Message', messageSchema);

export default Message;