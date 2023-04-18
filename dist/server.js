"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(morgan("dev"));
app.use(cors({}));
const PORT = process.env.PORT || "4321";
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map