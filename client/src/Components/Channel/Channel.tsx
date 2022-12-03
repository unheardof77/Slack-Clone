
interface ChannelNames{
    name: string;
    _id: number;
}

export default function Channel({name}:ChannelNames){

    return(
        <section>
            <h2># {name}</h2>
        </section>
    )
};