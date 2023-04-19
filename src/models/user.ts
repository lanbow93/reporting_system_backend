import mongoose from "../db/connection";
import { IUser } from "../utils/InterfacesUsed";
const Joi = require('Joi')

const {Schema, model} = mongoose

const userSchema = new Schema<IUser>({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})

const validateUser = (user: IUser) => {
    return userValidationSchema.validate(user)
}

const User = model<IUser>('User', userSchema);

export default {User, validateUser}