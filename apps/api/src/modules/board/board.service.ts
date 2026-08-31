import { prisma } from "../../prisma";
import { CreateBoardDto, UpdateBoardDto } from "./board.types";

export async function getUserBoards(workspaceId: number, userId: number) {
    return prisma.board.findMany({
        where: {
            workspaceId,
            workspace: {
                members: { some: { userId } },
            },
        },
    });
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
