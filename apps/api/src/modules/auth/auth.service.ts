import { LoginDto, RegisterDto } from "./auth.types";
import { prisma } from "../../prisma";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../lib/jwt";
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
    // await prisma.refreshToken.deleteMany({
    //     where: { tokenHash: hashToken(refreshTokenCookie) },
    // });

    await prisma.refreshToken.updateMany({
        where: {
            tokenHash: hashToken(refreshTokenCookie),
            revokedAt: null,
        },
        data: { revokedAt: new Date() },
    });
    return { message: "Logged out successfully" };
}
