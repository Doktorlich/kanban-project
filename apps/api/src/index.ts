import express, { type Response, type Request } from "express";
import "dotenv/config";
import { authRouter } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json()); // без этого req.body будет undefined
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
