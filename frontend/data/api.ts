import axios from "axios"
import { User } from "../src/types/User"
import { Question } from "../src/types/Question"
import { Answer } from "../src/types/Answer"

const SERVER_URL = import.meta.env.MODE === 'production' ? "https://bgr-backend.fly.dev" : "http://localhost:3000"

export const api = () => {
    return {
        users() {
            return {
                async create(user: User): Promise<string> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${SERVER_URL}/users`,
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
                },
                async verify(password: string): Promise<{ statusCode: number, message: string }> {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${SERVER_URL}/users/login`,
                            headers: {},
                            data: {
                                password
                            }
                        });
                        return res?.data
                    } catch (error: any) {
                        if (error.response) {
                            return { statusCode: error.response.status, message: error.response.statusText }
                        } else {
                            return { statusCode: 500, message: 'Server error' }
                        }
                    }
                }
            }
        },
        questions() {
            return {
                async getAll(): Promise<Question[]> {
                    try {
                        const res = await axios.get(`${SERVER_URL}/questions`)
                        return res?.data
                    } catch (error) {
                        console.log(error)
                        return []
                    }
                },
                async deleteOne(question: Question): Promise<void> {
                    try {
                        await axios.delete(`${SERVER_URL}/questions/${question._id}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async changeTitleById(id: string, title: string): Promise<void> {
                    try {
                        await axios.patch(`${SERVER_URL}/questions/${id}/title`, {title: title})
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async changeQuestionOptionURL(id: string, index: number, url: string): Promise<void> {
                    try {
                        await axios.patch(`${SERVER_URL}/questions/${id}/index/${index}/url`, {url: url})
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async changeQuestionOptionType(id: string, index: number, type: string): Promise<void> {
                    try {
                        await axios.patch(`${SERVER_URL}/questions/${id}/index/${index}/type/${type}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async swapQuestionNumbers(firstNum: number, secondNum: number): Promise<void> {
                    try {                        
                        await axios.patch(`${SERVER_URL}/questions/number/${firstNum}/${secondNum}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async changeCorrectIndex(id: string, correctIndex: number): Promise<void> {
                    try {                        
                        await axios.patch(`${SERVER_URL}/questions/${id}/correctIndex/${correctIndex}`)
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                },
                async add(question: Question): Promise<() => number> {
                    const res = await axios({
                        method: 'post',
                        url: `${SERVER_URL}/questions`,
                        headers: {},
                        data: {
                            question
                        }
                    });
                    console.log(res?.data);

                    return res?.data.count
                }
            }
        },
        answers() {
            return {
                async getAll(): Promise<Answer[]> {
                    const res = await axios.get(`${SERVER_URL}/answers`)
                    console.log(res?.data);
                    return res?.data
                },
                async addAnswers(answers: Answer[]): Promise<() => number> {
                    const res = await axios({
                        method: 'post',
                        url: `${SERVER_URL}/answers`,
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
