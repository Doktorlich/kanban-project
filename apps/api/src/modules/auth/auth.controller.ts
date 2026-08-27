import type { Request, Response } from "express";
import { registerUser } from "./auth.service";

export async function register(req: Request, res: Response) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
}
