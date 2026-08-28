import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies.accessToken;

    if (!token) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    try {
        const payload = verifyAccessToken(token);
        req.userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
