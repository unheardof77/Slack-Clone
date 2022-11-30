import { useLazyQuery, useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { SIGNUP } from "../../utils/crud/Mutations";
import Auth from "../../utils/auth/auth";

export default function Signup(){
    const [usernameVal, setUserVal] = useState("");
    const [passwordVal, setPassVal] = useState("");
    const [signUp, {error, data}] = useMutation(SIGNUP);

    function inputChange(e:ChangeEvent<HTMLInputElement>){
        switch(e.target.name){
            case "username": setUserVal(e.target.value); break;
            case "password": setPassVal(e.target.value); break;
            default: alert('Signup switchcase broke.')
        }
    };

    async function formSubmitHandler(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const { data } = await signUp({variables: { username: usernameVal, password: passwordVal}})
            Auth.login(data.signup.token)
        }catch(err){
            console.error(err)
        }
    };

    return (
        <section>
            <form onSubmit={formSubmitHandler}>
                <input onChange={inputChange} value={usernameVal} name='username' placeholder="username"/>
                <input onChange={inputChange} value={passwordVal} name='password' placeholder="password"/>
                <button type="submit">Signup</button>
            </form>
        </section>
    )
};