import axios from "axios"
import { User } from "../src/types/User"
import { Question } from "../src/types/Question"
import { Answer } from "../src/types/Answer"

export const api = () => {
    return {
        users() {
            return {
                // async getById(id: string): Promise<() => User> {
                //     const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`)
                //     console.log(res?.data);
                //     return res?.data
                // },
                async create(user: User): Promise<() => string> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${process.env.REACT_APP_SERVER_URL}/users`,
                            headers: {},
                            data: {
                                user
                            }
                        });
                        console.log(res?.data);
                        return res?.data.id
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        },
        questions() {
            return {
                async getAll(): Promise<() => Question[]> {
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/questions`)
                        console.log(res?.data);
                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return []
                    }
                }
            }
        },
        answers() {
            return {
                async getAll(): Promise<() => Answer[]> {
                    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/answers`)
                    console.log(res?.data);
                    return res?.data
                },
                async addAnswers(answers: Answer[]): Promise<() => number> {
                    const res = await axios({
                        method: 'post',
                        url: `${process.env.REACT_APP_SERVER_URL}/answers`,
                        headers: {},
                        data: {
                            answers
                        }
                    });
                    console.log(res?.data);

                    return res?.data.count
                }
            }
        }
    }
}