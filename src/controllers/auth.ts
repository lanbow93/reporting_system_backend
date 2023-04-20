import { Request, Response, Router } from "express"
import {validateUser, User} from "../models/user"
import { IUser } from "../utils/InterfacesUsed"
import bcrypt from "bcryptjs"
require("dotenv").config()

// const SECRET: string = process.env.SECRET ?? ""

const router: Router = Router()

// Admin signup post
router.post("/signup", async (request: Request, response: Response) => {
    try {
        //Validate input using Joi
        const {error} = validateUser(request.body) // Check to see if the validation returns an error
        // If validations returns an error
        if (error) {
            return response.status(400).json(error) // Return json error
        }

        // Using bcrypt to salt and hash the password 
        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(10))

        // Creating user object after password has been encrypted and trying to make Mongo object
        const newUser: IUser = await User.create({
            name: request.body.name,
            email: request.body.email,
            username: request.body.username,
            password: request.body.password
        })
        
        // Response if successful, returns json of a successful status message and user object
        response.status(200).json({status: "User Created", username: newUser})


    } catch (error) {
        response.status(400).json({error})
    }
})


export default router