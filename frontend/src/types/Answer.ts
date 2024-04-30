export interface Answer {
    userId: string,
    questionNum: number,
    questionTitle: string //foreign key
    selectedAnswer: number,
    type: string,
    wasCorrect: boolean,
    secondsTaken: number
}