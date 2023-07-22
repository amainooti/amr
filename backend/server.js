import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDb } from "./db/db.js";
import authrouter from "./routes/auth.js";
import applicationRouter from "./routes/application.js";
import messageRouter from "./routes/message.js";
import userRouter from "./routes/users.js";
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3500;
// using types of encoding formencoded and json
app.use(express.urlencoded({ extended: true , limit: "3mb"}));
app.use(express.json({limit: "3mb"}));
app.use(cors());
app.use(morgan("combined"));

// routers

app.use("/auth", authrouter);
app.use("/application", applicationRouter);
app.use("/user", userRouter);
app.use("/message", messageRouter);

function startAPP(uri) {
    app.listen(uri, () => {
        console.log(`Server is starting on on http://localhost:${uri}`);
        connectDb(process.env.MONGO_DB);
    })
}

startAPP(PORT)

//http://localhost:3500/auth/signin