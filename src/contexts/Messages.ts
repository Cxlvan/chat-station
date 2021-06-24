import create from "zustand";

interface message {
    sender: string;
    message: string;
    time: number;
}
export const useMessages = create(set => ({
    messages: [],
    clearChat: () => {set(state =>( { ...state, messages: [] }))},
    addMessage: (message: message) => {set((state: any) =>( { ...state, messages: [...state.messages, message] }))}
  } as {
    [key: string]: any
  }
))