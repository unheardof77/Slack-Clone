import Header from '../../Components/Header/Header';
import SendBar from '../../Components/SendBar/SendBar';
import ChatLog from '../../Components/ChatLog/ChatLog';
import { useQuery } from '@apollo/client';
interface mainProps {

};

export default function Main(props:mainProps){
    const {subscribeToMore, data} = useQuery();


    return(
        <section className='flex'>
            <Header user=''/>
            <div className='flex flex-col'>
                <section className='flex flex-col'>
                    {/** This is going to be all the chatrooms filtered with group messages on top and dm's on the bottom */}
                    <ChatLog/>
                </section>
                <section>
                    <section>
                        {/** This is going to be all the chat messages for the room */}
                    </section>
                    <SendBar recipient={['']} />
                </section>
            </div>
        </section>
    )
};