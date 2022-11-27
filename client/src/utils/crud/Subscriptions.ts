import { gql } from "@apollo/client";

export const MESSAGE_SUB = gql`
    subscription messageSent($roomID: _id!, $message:string!){
        messageSent(roomID: _id, message:string) {
            _id
            name
            members
            messages
        }
    }
`;