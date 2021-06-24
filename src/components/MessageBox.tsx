import { useEffect, useRef } from "react"
import { useMessages } from "../contexts/Messages"
import { useUsername } from "../contexts/UserContext"

export const MessageBox = () => {
    const messages = useMessages((state: any) => state.messages)
    const myusername = useUsername((state: any) => state.username)
    let messageSet = messages.filter(function(item: any, pos: any) {
        return messages.indexOf(item) == pos;
    })
    const uniqueMessages = Array.from(new Set(messages.map((a: any) => a.time)))
 .map((time: any) => {
   return messages.find((a: any) => a.time === time)
 })
    const latestChat = useRef(null) 
    useEffect(() => {
        if(latestChat.current){
            (latestChat.current || {focus: () => {}}).focus()
        }
    }, [messages])
    return (
        <div className="w-full h-96 bg-gray-200 my-2 rounded-md p-2 gap-2 flex flex-col overflow-scroll">
            {
                uniqueMessages.map((message: any, v: number) => (
                    <div ref={latestChat} className={`${message.username !== myusername ? '' : 'self-end'} w-2/3`} key={message.time}>
                        <div className={`rounded-md mx-2 justify-center p-2 flex flex-col ${message.username !== myusername ? 'bg-gray-700 text-gray-100' : 'bg-indigo-500 text-white self-end'}`}>
                            <h3 className="font-semibold flex flex-row gap-2 items-center">
                                {message.username}
                                <span className="inline text-xs text-opacity-60">
                                    {((new Date(message.time).getHours() > 12) ? ((new Date(message.time).getHours() - 12) + ':' + new Date(message.time).getMinutes() + ' PM') : (new Date(message.time).getHours() + ':' + new Date(message.time).getMinutes() + ' AM')) }
                                </span>
                            </h3>
                            <p>
                                {message.message}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}