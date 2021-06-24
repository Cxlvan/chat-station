import { useState } from "react"
import { useUsername } from "../contexts/UserContext"

export const PickUsername = () => {
    const [pickUsername, setPickUsername] = useState("")
    const username = useUsername(state => state.username)
    const setUsername = useUsername(state => state.setUser)
    return (
        <div className="flex flex-col items-center justify-center w-96">
            <h1 className="text-3xl">Currently logged out, pick a username to login as!</h1>
            <input className="border-b-2 m-3 ring-1 ring-gray-700 p-2 rounded-md" placeholder="username" onChange={text => setPickUsername(text.currentTarget.value)}></input>
            <button onClick={() => setUsername(pickUsername)} className={`bg-purple-500 w-full px-3 py-2 rounded-md text-white`} disabled={pickUsername === ""}>Login</button>
        </div>
    )
}