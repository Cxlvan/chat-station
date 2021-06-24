import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { useMessages } from "../contexts/Messages"
import { useSocket } from "../contexts/SocketContext"
import { useUsername } from "../contexts/UserContext"
import { MessageBox } from "./MessageBox"

export const Dashboard = () => {
    const username = useUsername(state => state.username)
    const setUsername = useUsername(state => state.setUser)
    const [messageTyped, setMessageTyped] = useState("")
    const socket:Socket = useSocket(state => state.socket)
    const addMessage = useMessages(state => state.addMessage)
    const clearChat = useMessages(state => state.clearChat)
    const sendMessage = () =>{
        setMessageTyped("")
        let newMessage = {
            username,
            message: messageTyped,
            time: Date.now()
        }
        addMessage(newMessage)
        socket.emit('send_message', JSON.stringify(newMessage))

    }
    socket.on('new_message', (msg: string) => {
        let incomingMsg = JSON.parse(msg)
        addMessage(incomingMsg)
    })
    let clearAllChat = () => {
        clearChat()
        addMessage({
            username: "bobby (system)",
            message: "The chat has been cleared for you!",
            time: Date.now()
        })
    }
    useEffect(() => {
        addMessage({
            username: "Bot (Console)",
            message: "Welcome! Feel free to have a conversation with another user here :)",
            time: Date.now()
        })
    }, [])
    return (
        <div className="flex flex-col w-full md:w-5/12">
            <span className="text-xl my-4 flex flex-row w-full items-center justify-start">
                <span className="flex-1">Logged in as:</span> <span className="bg-gray-300 text-blue-700 p-2 rounded-md justify-end">{username}</span>
            </span>
            <button onClick={() => setUsername("")} className="bg-gray-300 p-3 rounded-md">Logout 👋</button>
            <MessageBox />
            <div className="flex flex-col gap-2 my-2">
                <input value={messageTyped} onChange={text => setMessageTyped(text.currentTarget.value)} placeholder="Type a message..." className="bg-gray-200 text-gray-800 rounded-md p-2"></input>
                <div className="flex flex-row gap-2">
                    <button onClick={clearAllChat} className="bg-pink-500 w-full p-2 text-white rounded-md">Clear Chat</button>
                    <button className="bg-green-500 w-full p-2 text-white rounded-md" onClick={sendMessage}>Send Message</button>
                </div>
            </div>
            <h6 className="text-gray-600">Made By Bobby Fang!</h6>
        </div>
    )
}