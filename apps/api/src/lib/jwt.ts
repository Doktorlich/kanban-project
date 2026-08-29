import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error("JWT secrets are not set in the environment");
}

export interface AccessTokenPayload {
    userId: number;
}
export function signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, ACCESS_SECRET!, { expiresIn: "15m" });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
    return jwt.verify(token, ACCESS_SECRET!) as AccessTokenPayload;
}

export function signRefreshToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, REFRESH_SECRET!, { expiresIn: Math.floor(REFRESH_TOKEN_TTL_MS / 1000) });
}

export function verifyRefreshToken(token: string): AccessTokenPayload {
    return jwt.verify(token, REFRESH_SECRET!) as AccessTokenPayload;
}
