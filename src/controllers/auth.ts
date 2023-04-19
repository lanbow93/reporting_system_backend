const express = require("express")
import { Request, Response, Router } from "express"
import {User, validateUser} from "../models/user"




const router: Router = express.Router()

// Admin signup post
router.post("signup", async (request: Request, response: Response) => {
    try {
        //Validate input using Joi
        const {error} = validateUser(request.body) // Check to see if the validation returns an error

        // If validations returns an error
        if (error) {
            return response.status(400).json(error)
        }
        
    } catch (error) {

    }
})


export default router