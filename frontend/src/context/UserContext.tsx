import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { User } from "../types/User";
import { Answer } from "../types/Answer";

interface iUserContext {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    clearUser: () => void,
    answers: Answer[],
    addAnswer: (answer: Answer) => void
}
const UserContext = React.createContext<iUserContext | null>(null)

export const useUserContext = () => useContext(UserContext) as iUserContext
const defaultUser: User = {
    id: '',
    age: 0,
    gender: '',
    canRead: '',
    frame: {
        name: '',
        organization: '',
        city: ''
    }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(defaultUser);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const addAnswer = (answer: Answer) => {
        if (answers.findIndex(ans => ans.questionId === answer.questionId) === -1) {
            setAnswers([...answers, answer])
        }
    }

    const clearUser = (): void => {
        setUser(defaultUser)
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser, answers, addAnswer }}>
            {children}
        </UserContext.Provider>
    )
}