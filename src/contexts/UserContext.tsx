import create from "zustand";


export const useUsername = create(set => ({
    username: "",
    setUser: (username: string) => {
        try {
            localStorage.setItem('username', username)
        } catch (error) {
        }
        set({username})
    },
}))