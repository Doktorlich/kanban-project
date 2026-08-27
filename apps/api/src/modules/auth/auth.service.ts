import { RegisterDto } from "./auth.types";
import { prisma } from "../../prisma";
import bcrypt from "bcrypt";

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
