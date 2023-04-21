import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import { IVerifyRequest } from "./InterfacesUsed";
require("dotenv").config()

const SECRET: string = process.env.SECRET ?? ""



async function userLoggedIn (request: IVerifyRequest, response: Response, next: NextFunction){
    try {
        // Check to see if token was sent
        const {userToken = false} = request.cookies;
        // If userToken exists
        if (userToken) {
            // Now verify token
            const payload = await jwt.verify(userToken, SECRET)
            // Add payload to the request
            request.payload = payload;
            next() // Continue to the next part of the request/route
        } else {
            throw "Not Verified"
        }
    } catch (error) {
        response.status(400).json({error})
    }

}

export default userLoggedIn