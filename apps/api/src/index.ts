import "dotenv/config";
import express, { type Response, type Request } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(8080, (error: Error | undefined) => {
    if (error) {
        console.log("Failed running server");
    }
    console.log("Server is running");
});
