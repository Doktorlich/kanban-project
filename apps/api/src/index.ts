// ./index.ts
import "dotenv/config";
import type {} from "./types/express.d.ts";
import { createServer } from "http";
import { initSocketServer } from "./socket";
import express, { type Response, type Request } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.routes";
import { workspaceRouter } from "./modules/workspace/workspace.routes";
import { boardRouter } from "./modules/board/board.routes";
import { columnRouter } from "./modules/column/column.routes";
import { taskDetailRouter, taskRouter } from "./modules/task/task.routes";
import { priorityRouter } from "./modules/priority/priority.routes";
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/priorities", priorityRouter);
app.use("/workspaces", workspaceRouter);
app.use("/workspaces/:workspaceId/boards", boardRouter);
app.use("/workspaces/:workspaceId/boards/:boardId/columns", columnRouter);
app.use("/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks", taskRouter);
app.use("/workspaces/:workspaceId/boards/:boardId/tasks", taskDetailRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

const httpServer = createServer(app);
initSocketServer(httpServer);

httpServer.on("error", error => {
    console.log("Failed running server", error.message);
});
httpServer.listen(8080, () => {
    console.log("Server is running");
});
