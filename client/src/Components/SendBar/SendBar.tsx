import React, { ChangeEvent, useState } from "react"

interface sendBarProp{
    

};

export default function SendBar(){
    const [sendBarValue, setBarValue] = useState("");

    const sendChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setBarValue(event.target.value);
    };

    return (
        <section>
            <input onChange={sendChange} placeholder={`Message`} value={sendBarValue} name="sendBar"></input>
        </section>
    )
};