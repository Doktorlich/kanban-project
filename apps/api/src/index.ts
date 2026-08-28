import type {} from "./types/express.d.ts";
import express, { type Response, type Request } from "express";
import "dotenv/config";
import { authRouter } from "./modules/auth/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(8080, (error: Error | undefined) => {
    if (error) {
        console.log("Failed running server");
    }
    console.log("Server is running");
});
