"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DATABASE_URL = process.env.DATABASE_URL ?? '';
mongoose_1.default.connect(DATABASE_URL);
mongoose_1.default.connection
    .on("open", () => { console.log("Mongo is connected"); })
    .on("close", () => { console.log("Mongo is disconnected"); })
    .on("error", (error) => { console.log(error); });
exports.default = mongoose_1.default;
//# sourceMappingURL=connection.js.map