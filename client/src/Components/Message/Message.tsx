interface MessageProp{
    content: string
    user: string
    timestamp: number
}

export default function Message({content, user, timestamp}:MessageProp){

    return(
        <section>
            <h2>{user}</h2>
            <h3>{timestamp}</h3>
            <p>{content}</p>
        </section>
    )
};