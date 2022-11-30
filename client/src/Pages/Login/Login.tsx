import { useLazyQuery, useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { LOGIN } from "../../utils/crud/Mutations";
import Auth from "../../utils/auth/auth";

export default function Signup(){
    const [usernameVal, setUserVal] = useState("");
    const [passwordVal, setPassVal] = useState("");
    const [login, {error, data}] = useMutation(LOGIN);

    function inputChange(e:ChangeEvent<HTMLInputElement>){
        switch(e.target.name){
            case "username": setUserVal(e.target.value); break;
            case "password": setPassVal(e.target.value); break;
            default: alert('login switchcase broke.')
        }
    };

    async function formSubmitHandler(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const { data } = await login({variables: { username: usernameVal, password: passwordVal}})
            Auth.login(data.login.token)
        }catch(err){
            console.error(err)
        }
    };

    return (
        <section>
            <form onSubmit={formSubmitHandler}>
                <input onChange={inputChange} value={usernameVal} name='username' placeholder="username"/>
                <input onChange={inputChange} value={passwordVal} name='password' placeholder="password"/>
                <button type="submit">Login</button>
            </form>
        </section>
    )
};