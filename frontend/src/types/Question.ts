import { Option } from "./Option"

export interface Question {
    _id: string,
    number: number,
    title: string,
    options: Option[],
    correctIndex: number
}