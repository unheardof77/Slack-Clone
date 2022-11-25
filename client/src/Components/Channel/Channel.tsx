
interface ChannelNames{
    channelName: string
}

export default function Channel({channelName}:ChannelNames){

    return(
        <section>
            <h2># {channelName}</h2>
        </section>
    )
};