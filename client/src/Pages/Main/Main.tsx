import Header from '../../Components/Header/Header';
import SendBar from '../../Components/SendBar/SendBar';
import ChatLog from '../../Components/ChatLog/ChatLog';
import { useQuery } from '@apollo/client';

import { getUserNameChatRoom } from '../../utils/crud/Querys'
import ChatSection from '../../Components/ChatSection/ChatSection';
interface mainProps {

};

export default function Main(props:mainProps){
    const {subscribeToMore, data} = useQuery(getUserNameChatRoom);


    return(
        <section className='flex'>
            <Header user={data.getUser.username}/>
            <div className='flex '>
                <section className='flex flex-col'>
                    {/** This is going to be all the chatrooms filtered with group messages on top and dm's on the bottom */}
                    <ChatLog ChatRooms={data.getUser.ChatRooms}/>
                </section>
                <ChatSection/>
            </div>
        </section>
    )
};