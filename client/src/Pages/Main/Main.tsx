import Header from '../../Components/Header/Header'
import SendBar from '../../Components/SendBar/SendBar'

interface mainProps {

};

export default function Main(props:mainProps){

    return(
        <section className='flex'>
            <Header user=''/>
            <div className='flex flex-col'>
                <section className='flex flex-col'>

                </section>
                <section>

                <SendBar recipient={['']} />
                </section>
            </div>
        </section>
    )
};