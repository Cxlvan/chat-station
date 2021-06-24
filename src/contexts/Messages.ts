import create from "zustand";

interface message {
    sender: string;
    message: string;
    time: number;
}
export const useMessages = create(set => ({
    messages: [],
    clearChat: () => {set(state =>( { ...state, messages: [] }))},
    addMessage: (message) => {set(state =>( { ...state, messages: [...state.messages, message] }))}
  } as {
      messages: message[],
      addMessage: (message: message) => void;
      clearChat: () => void;
  }
))