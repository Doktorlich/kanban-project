import { LoginDto, RegisterDto } from "./auth.types";
import { prisma } from "../../prisma";
import bcrypt from "bcrypt";
import { REFRESH_TOKEN_TTL_MS, signAccessToken, signRefreshToken, verifyRefreshToken } from "../../lib/jwt";
import { hashToken } from "../../lib/hash";

export async function registerUser(dto: RegisterDto) {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email: dto.email }, { username: dto.username }],
        },
    });
    if (existingUser) {
        throw new Error("User with this email or username already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await prisma.user.create({
        data: {
            email: dto.email,
            passwordHash,
            username: dto.username,
            firstName: dto.firstName,
            lastName: dto.firstName,
        },
    });
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
}

export async function loginUser(dto: LoginDto) {
    const user = await prisma.user.findUnique({
        where: { email: dto.email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });

    await prisma.refreshToken.create({
        data: {
            tokenHash: hashToken(refreshToken),
            userId: user.id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
    });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
}

export async function logoutUser(refreshTokenCookie: string) {
    await prisma.refreshToken.updateMany({
        where: {
            tokenHash: hashToken(refreshTokenCookie),
            revokedAt: null,
        },
        data: { revokedAt: new Date() },
    });
    return { message: "Logged out successfully" };
}

export async function validateSession(refreshTokenCookie: string) {
    verifyRefreshToken(refreshTokenCookie);

    const refreshToken = await prisma.refreshToken.findUnique({
        where: {
            tokenHash: hashToken(refreshTokenCookie),
        },
    });

    if (!refreshToken) {
        throw new Error("Session not found");
    }

    if (refreshToken.revokedAt !== null) {
        throw new Error("Session was revoked");
    }

    const { tokenHash: _, ...safeRefreshToken } = refreshToken;
    return { safeRefreshToken };
}

export async function updateToken(tokenId: number, userId: number) {
    const newAccessToken = signAccessToken({ userId: userId });
    const newRefreshToken = signRefreshToken({ userId: userId });
    await prisma.$transaction([
        prisma.refreshToken.update({
            where: { id: tokenId },
            data: { revokedAt: new Date() },
        }),
        prisma.refreshToken.create({
            data: {
                tokenHash: hashToken(newRefreshToken),
                userId,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
            },
        }),
    ]);

    return { newAccessToken, newRefreshToken };
}
