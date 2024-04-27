import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { User } from "../types/User";

interface iUserContext {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}
const UserContext = React.createContext<iUserContext | null>(null)

export const useUserContext = () => useContext(UserContext) as iUserContext
const defaultUser: User = {
    age: 0,
    gender: '',
    canRead: '',
    frame: {
        name: '',
        organization: '',
        city: ''
    }
}

export const UserProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState(defaultUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}