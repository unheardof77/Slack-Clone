import { Schema, model } from "mongoose";

const ChatRoomSchema = new Schema({
    name:{
        type:String,
        required: true,
        default: "Chatroom"
    },
    members:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

ChatRoomSchema.virtual('isPrivateMessage').get(function (){
    if(this.members.length >2){
        return false;
    }else{
        return true;
    }
});

const ChatRoom = model('ChatRoom', ChatRoomSchema);

export default ChatRoom;