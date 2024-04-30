export interface User {
    id: string
    age: number,
    gender: string,
    canRead: string,
    frame: {
        name: string,
        organization: string,
        city: string
    }
}