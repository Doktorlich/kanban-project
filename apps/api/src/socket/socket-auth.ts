import { parse } from "cookie";
import type { AppSocket } from "./types";
import { verifyAccessToken } from "../lib/jwt";

export function socketAuthMiddleware(socket: AppSocket, next: (err?: Error) => void): void {
    const cookies = parse(socket.handshake.headers.cookie ?? "");

    const token = cookies.accessToken;
    if (!token) return next(new Error("Unauthorized"));
    try {
        const payload = verifyAccessToken(token);
        socket.data.userId = payload.userId;
        next();
    } catch {
        next(new Error("Unauthorized"));
    }
}
