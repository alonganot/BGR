import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { User } from "../types/User";
import { Answer } from "../types/Answer";

interface iUserContext {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    answers: Answer[],
    addAnswer: (answer: Answer) => void
}
const UserContext = React.createContext<iUserContext | null>(null)

export const useUserContext = () => useContext(UserContext) as iUserContext
export const defaultUser: User = {
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

export const UserProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState(defaultUser);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const addAnswer = (answer: Answer) => {
        if(answers.findIndex(ans => ans.questionTitle === answer.questionTitle) === -1) {
            setAnswers([...answers, answer])
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, answers, addAnswer }}>
            {children}
        </UserContext.Provider>
    )
}