"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const SECRET = process.env.SECRET ?? "";
async function userLoggedIn(request, response, next) {
    try {
        const { userToken = false } = request.cookies;
        if (userToken) {
            const payload = await jsonwebtoken_1.default.verify(userToken, SECRET);
            request.payload = payload;
            next();
        }
        else {
            throw "Not Verified";
        }
    }
    catch (error) {
        response.status(400).json({ error });
    }
}
exports.default = userLoggedIn;
//# sourceMappingURL=VerifyUser.js.map