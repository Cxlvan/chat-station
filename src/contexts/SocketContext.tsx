import { Socket } from "socket.io-client";
import create from "zustand";

export const useSocket = create(set => ({
    socket: null,
    setSocket: (socket: Socket) => set({ socket })
  } as {
    [key: string]: any
  }))