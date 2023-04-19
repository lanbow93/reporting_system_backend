import dotenv from "dotenv"
import mongoose, {Error} from "mongoose";
dotenv.config()
// Type string and if DatabaseURL is undefined set it to an empty string
// ?? is used to define something only if the other thing is Null or undefined
const DATABASE_URL: string = process.env.DATABASE_URL ?? ''; 

mongoose.connect(DATABASE_URL)

mongoose.connection
    .on("open", () => {console.log("Mongo is connected")})
    .on("close", () => {console.log("Mongo is disconnected")})
    .on("error", (error: Error) => {console.log(error)})

export default mongoose