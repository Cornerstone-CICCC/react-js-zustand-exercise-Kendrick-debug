import { create } from "zustand";
import {v4 as uuidv4} from 'uuid'
import { persist } from "zustand/middleware";


interface User {
    id: string
    firstName: string
    lastName: string
    age: Number
    hobbies: string[]
}

type UserStoreState = {
    user: User[],
    addUser: (emp: Omit<User, 'id'>) => void,
    deleteUser: (id: string) => void
}


export const useUserStore = create<UserStoreState>() (
    persist(
        (set) => ({
            user: [],
            addUser: (emp) => {
                const newEmp = {...emp, id: uuidv4()}
                set((state) => ({ user: [...state.user, newEmp] }))
            },

            deleteUser: (id) => set((state) => 
            ({ user: state.user.filter(emp => emp.id ! == id) }))

        }),


        {
            name: 'User-Storage' //Local Storage Key
        }
        
    )
)