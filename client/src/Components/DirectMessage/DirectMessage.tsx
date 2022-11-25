interface DM {
    friendName:string
};

export default function DirectMessage({friendName}:DM){

    return(
        <section>
            <h2>{friendName}</h2>
        </section>
    )
};