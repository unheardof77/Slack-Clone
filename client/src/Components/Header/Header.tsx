interface HeaderProps{
    user:string
}

export default function Header({user}:HeaderProps){

    return(
        <header className="flex content-end h-16">
            <h1>{user}</h1>
        </header>
    )
};