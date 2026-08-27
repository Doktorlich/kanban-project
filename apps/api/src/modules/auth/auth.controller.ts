import type { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";
import { setAuthCookies } from "../../lib/cookies";

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

export async function login(req: Request, res: Response) {
    try {
        const { user, accessToken, refreshToken } = await loginUser(req.body);
        setAuthCookies(res, accessToken, refreshToken);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
}
