export interface Answer {
    userId: string,
    questionTitle: string //foreign key
    selectedAnswer: number,
    wasCorrect: boolean,
    secondsTaken: number
}