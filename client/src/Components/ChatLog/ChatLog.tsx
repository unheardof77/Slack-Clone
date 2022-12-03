import Channel from '../Channel/Channel';

interface ChatRooms {
    name: string;
    _id: number;
    isPrivateMessage:boolean;
}
interface ChatLogProps {
    ChatRooms:[ChatRooms]
}

export default function ChatLog(props:ChatLogProps){
    const sortedRooms = props.ChatRooms.sort((a, b) => Number(a.isPrivateMessage) - Number(b.isPrivateMessage));

    return (
        <section>
            {sortedRooms.map((room) => <Channel key={room._id} name={room.name} _id={room._id}/>)}
        </section>
    )
};