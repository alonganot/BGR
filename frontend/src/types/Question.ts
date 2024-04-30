import { Option } from "./Option"

export interface Question {
    number: number,
    title: string,
    options: Option[],
    correctIndex: number
}