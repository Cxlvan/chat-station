import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useUsername } from '../contexts/UserContext'
import { useSocket } from '../contexts/SocketContext'
import { io, Socket } from 'socket.io-client'
function MyApp({ Component, pageProps }: AppProps) {
  let setUsername = useUsername((state: any) => state.setUser)
  const setSocket = useSocket((state: any) => state.setSocket)
  const socket = useSocket((state: any) => state.socket)
  
  useEffect(() => {
    setUsername(localStorage.getItem('username') || '')
    if(socket === null){
      let windowSocket = io("http://142.44.136.240:5469/ws/", { upgrade: false, transports: ['websocket'], secure: false })
      setSocket(windowSocket);
    }
  }, [])
  return (
    <>
      {
        socket !== null ? <Component {...pageProps} /> : (
          <h2 className="text-3xl">Loading...</h2>
        )
      }
    </>
  ) 
}
export default MyApp
