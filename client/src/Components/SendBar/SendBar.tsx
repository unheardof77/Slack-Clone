import React, { ChangeEvent, useState } from "react"

interface sendBarProp{
    recipient: string

};

export default function SendBar({recipient}:sendBarProp){
    const [sendBarValue, setBarValue] = useState("");

    const sendChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setBarValue(event.target.value);
    };

    return (
        <section>
            <input onChange={sendChange} placeholder={`Message ${recipient}`} value={sendBarValue} name="sendBar"></input>
        </section>
    )
};