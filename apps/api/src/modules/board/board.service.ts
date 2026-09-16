import { prisma } from "../../prisma";
import { CreateBoardDto, UpdateBoardDto } from "./board.types";

export async function getUserBoards(workspaceId: number, userId: number) {
    const boards = await prisma.board.findMany({
        where: {
            workspaceId,
            workspace: {
                members: { some: { userId } },
            },
        },
        include: {
            columns: {
                include: {
                    _count: { select: { tasks: true } },
                },
            },
        },
    });
    return boards.map(({ columns, ...board }) => ({
        ...board,
        taskCount: columns.reduce((sum, column) => sum + column._count.tasks, 0),
    }));
}

export async function getBoardById(boardId: number) {
    const board = await prisma.board.findUnique({
        where: {
            id: boardId,
        },
    });
    if (!board) {
        throw new Error("Board not found");
    }
    return board;
}

export async function createBoard(workspaceId: number, dto: CreateBoardDto) {
    return prisma.board.create({
        data: {
            title: dto.title,
            workspaceId,
        },
    });
}

export async function updateBoard(boardId: number, dto: UpdateBoardDto) {
    return prisma.board.update({
        where: {
            id: boardId,
        },
        data: {
            title: dto.title,
        },
    });
}

export async function deleteBoard(boardId: number) {
    return prisma.board.delete({
        where: {
            id: boardId,
        },
    });
}
