// Import Dependencies
import { Application, Request, Response } from "express"
import authRouter from "./controllers/auth"
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()


//Application
const app: Application = express()

// Middleware
app.use(morgan("tiny")); // Verify routes are being contacted properly
app.use(cors({
    origin: ["http://localhost:5173"], // This will need to be whatever the frontend site or personal local host is
    credentials: true // Enables the sending of cookies and HTTP Authentication information (e.g., Basic Auth or OAuth) along with cross-origin requests
}))
app.use(express.json()) // Ability to parse and understand json data
app.use(cookieParser()) // Ability to send and receive cookies


// Routers
app.use("/auth", authRouter)


// Routes
app.get("/", (request: Request, response: Response) => {
    response.send("Server is operational")
})


// Listener
const PORT: String = process.env.PORT ?? "4321"
app.listen(PORT, ()=> {
    console.log(`Listening on port: ${PORT}`)
})