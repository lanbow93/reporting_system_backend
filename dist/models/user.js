"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.validateUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const Joi = require('joi');
const { Schema, model } = connection_1.default;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });
const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});
const validateUser = (user) => {
    return userValidationSchema.validate(user);
};
exports.validateUser = validateUser;
exports.User = model('User', userSchema);
//# sourceMappingURL=user.js.map