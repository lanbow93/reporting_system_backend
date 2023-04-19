// Area to make types and interfaces needed on other files

export interface IUser {
    name: string,
    email: string,
    username: string,
    password: string,
    id?: string,
    createdAt?: Date;
    updatedAt?: Date;
}