export enum CanReadEnum {
    לא,
    מעט,
    כן,
}

export enum GenderEnum {
    MALE = 'זכר' as any,
    FEMALE = 'נקבה' as any,
}

export interface User {
    age: number,
    gender: GenderEnum,
    canRead: CanReadEnum,

}