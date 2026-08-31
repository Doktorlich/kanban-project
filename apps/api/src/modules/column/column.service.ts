import { prisma } from "../../prisma";
import { CreateColumnDto, UpdateColumnDto } from "./column.types";

export async function createColumn(boardId: number, dto: CreateColumnDto) {
    return prisma.column.create({
        data: {
            boardId,
            title: dto.title,
            position: dto.position,
        },
    });
}

export async function getColumns(boardId: number) {
    return prisma.column.findMany({
        where: {
            boardId,
        },
    });
}
export async function getColumnById(columnId: number) {
    const column = await prisma.column.findUnique({ where: { id: columnId } });
    if (!column) {
        throw new Error("Column not found");
    }
    return column;
}

export async function updateColumn(columnId: number, dto: UpdateColumnDto) {
    return prisma.column.update({
        where: { id: columnId },
        data: {
            title: dto.title,
            position: dto.position,
        },
    });
}
export async function deleteColumn(columnId: number) {
    return prisma.column.delete({
        where: { id: columnId },
    });
}
