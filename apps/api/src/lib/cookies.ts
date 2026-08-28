import type { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней — совпадает с expiresIn refresh-токена
    });
}

export function clearAuthCookies(res: Response) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
}
