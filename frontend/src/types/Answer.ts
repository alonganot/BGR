export interface Answer {
    userId: string,
    questionId: string,
    selectedAnswer: number,
    type: string,
    wasCorrect: boolean,
    secondsTaken: number
}