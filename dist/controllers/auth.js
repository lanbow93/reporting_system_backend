"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const SECRET = process.env.SECRET ?? "";
const router = (0, express_1.Router)();
router.post("/signup", async (request, response) => {
    try {
        const { error } = (0, user_1.validateUser)(request.body);
        if (error) {
            return response.status(400).json(error);
        }
        request.body.password = await bcryptjs_1.default.hash(request.body.password, await bcryptjs_1.default.genSalt(10));
        const newUser = await user_1.User.create({
            name: request.body.name,
            email: request.body.email,
            username: request.body.username,
            password: request.body.password
        });
        response.status(200).json({ status: "User Created", username: newUser });
    }
    catch (error) {
        response.status(400).json({ error });
    }
});
router.post("/login", async (request, response) => {
    try {
        const username = request.body.username;
        const password = request.body.password;
        const user = await user_1.User.findOne({ username });
        if (user) {
            const passwordCheck = await bcryptjs_1.default.compare(password, user.password);
            if (passwordCheck) {
                const payload = { username };
                const userToken = await jsonwebtoken_1.default.sign(payload, SECRET);
                response.cookie("userToken", userToken, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "none",
                    secure: request.hostname === "locahhost" ? false : true,
                }).json({ payload, status: "logged in" });
            }
            else {
                response.status(400).json({ error: "Password does not match" });
            }
        }
        else {
            response.status(400).json({ error: "User does not exist" });
        }
    }
    catch (error) {
        response.status(400).json(error);
    }
});
router.post("'logout", async (request, response) => {
    response.clearCookie("userToken").json({ response: "You are logged out" });
});
exports.default = router;
//# sourceMappingURL=auth.js.map