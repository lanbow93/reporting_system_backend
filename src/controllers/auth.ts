import { Request, Response, Router } from "express"
import {validateUser, User} from "../models/user"
import {  IUser } from "../utils/InterfacesUsed"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

require("dotenv").config()

const SECRET: string = process.env.SECRET ?? ""

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

router.post("/login", async (request: Request, response: Response) => {
    try {
        const username: string = request.body.username
        const password: string = request.body.password

        // Check to see if username exists in the database
        const user: IUser | null = await User.findOne({username})
        // Check to see if user exists
        if (user){
            // Compare the password to stored password to see if they are the same
            const passwordCheck: Boolean = await bcrypt.compare(password, user.password)
            if(passwordCheck) {
                // Create payload with username object
                const payload = {username}
                const userToken = await jwt.sign(payload, SECRET)  // Encrypts the username on the token with the secret
                response.cookie("userToken", userToken, {
                    httpOnly: true, // Prevents user from changing or manupilating cookie
                    path: "/", // Assigns the cookie location
                    sameSite: "none", // Allows cookie request from different server
                    secure: request.hostname === "locahhost" ? false : true,}).json({payload, status: "logged in"}) // Needed for local host dev to get cookies
            } else {
                response.status(400).json({error: "Password does not match"})
            }
        } else {
            response.status(400).json({error: "User does not exist"})
        }
    } catch(error) {
        response.status(400).json(error)
    }
})

router.post("'logout", async (request: Request, response: Response) => {
    // Below removes cookie
    response.clearCookie("userToken").json({response: "You are logged out"})
})

export default router