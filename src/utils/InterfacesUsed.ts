// Area to make types and interfaces needed on other files

import { Request } from "express"; // Needed to import the Request Typescript inferface to build off of for authentication
import { JwtPayload } from "jsonwebtoken"; // To be able to implement a type that includes token

export interface IUser {
    name: string,
    email: string,
    username: string,
    password: string,
    id?: string,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IVerifyRequest extends Request {
    userToken: string,
    payload: JwtPayload | string
}

export interface ILoginRequest extends Request {
    username: string,
    password: string
}