import axios from "axios"
import { User } from "../src/types/User"
import { Question } from "../src/types/Question"
import { Answer } from "../src/types/Answer"

export const api = () => {
    return {
        users() {
            return {
                // async getById(id: string): Promise<User> {
                //     const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${id}`)
                //     console.log(res?.data);
                //     return res?.data
                // },
                async create(user: User): Promise<string> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${import.meta.env.VITE_SERVER_URL}/users`,
                            headers: {},
                            data: {
                                user
                            }
                        });
                        console.log(res?.data);
                        return res?.data.id
                    } catch (error) {
                        console.log(error)
                        return ''
                    }
                }
            }
        },
        questions() {
            return {
                async getAll(): Promise<Question[]> {
                    try {
                        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/questions`)
                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return []
                    }
                },
                async deleteOne(question: Question): Promise<void> {
                    try {
                        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/questions/${question._id}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async changeTitleById(id: string, title: string): Promise<void> {
                    try {
                        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/questions/${id}/${title}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async changeQuestionOptionURL(id: string, index: number, url: string): Promise<void> {
                    try {
                        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/questions/${id}/${index}/url/${url}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async changeQuestionOptionType(id: string, index: number, type: string): Promise<void> {
                    try {
                        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/questions/${id}/${index}/type/${type}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async swapQuestionNumbers(firstNum: number, secondNum: number): Promise<void> {
                    try {
                        await axios.patch(`${import.meta.env.VITE_SERVER_URL}/questions/number/${firstNum}/${secondNum}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
            }
        },
        answers() {
            return {
                async getAll(): Promise<Answer[]> {
                    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/answers`)
                    console.log(res?.data);
                    return res?.data
                },
                async addAnswers(answers: Answer[]): Promise<() => number> {
                    const res = await axios({
                        method: 'post',
                        url: `${import.meta.env.VITE_SERVER_URL}/answers`,
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