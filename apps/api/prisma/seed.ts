// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not set in the environment");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Приоритеты — создаём один раз, они справочные (не завязаны на юзера)
    const [low, medium, high] = await Promise.all([
        prisma.priority.upsert({
            where: { name: "low" },
            update: {},
            create: { name: "low", color: "#22C55E", weight: 1 },
        }),
        prisma.priority.upsert({
            where: { name: "medium" },
            update: {},
            create: { name: "medium", color: "#F59E0B", weight: 2 },
        }),
        prisma.priority.upsert({
            where: { name: "high" },
            update: {},
            create: { name: "high", color: "#EF4444", weight: 3 },
        }),
    ]);

    // 2. Тестовый юзер
    const passwordHash = await bcrypt.hash("password123", 10);

    const user = await prisma.user.upsert({
        where: { email: "test@example.com" },
        update: {},
        create: {
            email: "test@example.com",
            passwordHash,
            username: "testuser",
            firstName: "Test",
            lastName: "User",
        },
    });

    // 3. Воркспейс + сразу делаем юзера owner-ом через WorkspaceMember
    const workspace = await prisma.workspace.create({
        data: {
            title: "My Projects",
            members: {
                create: {
                    userId: user.id,
                    role: "owner",
                },
            },
        },
    });

    // 4. Доска
    const board = await prisma.board.create({
        data: {
            title: "Development Board",
            workspaceId: workspace.id,
        },
    });

    // 5. Дефолтный набор колонок — как раз твоя идея "применить набор колонок по умолчанию"
    const [todo, inProgress, reviewed, done] = await Promise.all([
        prisma.column.create({ data: { title: "To Do", position: 0, boardId: board.id } }),
        prisma.column.create({ data: { title: "In Progress", position: 1, boardId: board.id } }),
        prisma.column.create({ data: { title: "Reviewed", position: 2, boardId: board.id } }),
        prisma.column.create({ data: { title: "Done", position: 3, boardId: board.id } }),
    ]);

    // 6. Несколько задач в разных колонках, с владельцем через TaskOwner
    await prisma.task.create({
        data: {
            title: "Setup project structure",
            description: "Initialize monorepo and base configs",
            position: 0,
            columnId: todo.id,
            priorityId: medium.id,
            owners: { create: { userId: user.id } },
        },
    });

    await prisma.task.create({
        data: {
            title: "Design database schema",
            description: "ER-diagram and Prisma schema",
            position: 0,
            columnId: done.id,
            priorityId: high.id,
            owners: { create: { userId: user.id } },
        },
    });

    await prisma.task.create({
        data: {
            title: "Write authentication routes",
            position: 0,
            columnId: inProgress.id,
            priorityId: high.id,
            owners: { create: { userId: user.id } },
        },
    });

    console.log("Seed completed:", {
        user: user.email,
        workspace: workspace.title,
        board: board.title,
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
