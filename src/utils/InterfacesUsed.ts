// Area to make types and interfaces needed on other files

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

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