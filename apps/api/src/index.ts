// ./index.ts
import type {} from "./types/express.d.ts";
import express, { type Response, type Request } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.routes";
import { workspaceRouter } from "./modules/workspace/workspace.routes";
import { boardRouter } from "./modules/board/board.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/workspaces", workspaceRouter);
app.use("/workspaces/:workspaceId/boards", boardRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(8080, (error: Error | undefined) => {
    if (error) {
        console.log("Failed running server");
    }
    console.log("Server is running");
});
