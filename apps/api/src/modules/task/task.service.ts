import { prisma } from "../../prisma";
import { CreateTaskDto, UpdateTaskDto } from "./task.types";

export async function createTask(columnId: number, dto: CreateTaskDto) {
    return prisma.task.create({
        data: {
            columnId,
            title: dto.title,
            description: dto.description,
            position: dto.position,
            priorityId: dto.priorityId,
        },
    });
}
export async function getTasks(columnId: number) {
    return prisma.task.findMany({
        where: {
            columnId,
        },
    });
}

export async function getTaskById(boardId: number, columnId: number, taskId: number) {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId,
            column: { boardId },
            columnId,
        },
    });
    if (!task) {
        throw new Error("Task not found");
    }
    return task;
}

export async function updateTask(boardId: number, columnId: number, taskId: number, dto: UpdateTaskDto) {
    return prisma.task.update({
        where: {
            id: taskId,
            columnId,
            column: { boardId },
        },
        data: {
            title: dto.title,
            description: dto.description,
            position: dto.position,
            priorityId: dto.priorityId,
        },
    });
}

export async function deleteTask(boardId: number, columnId: number, taskId: number) {
    return prisma.task.delete({
        where: {
            id: taskId,
            columnId,
            column: { boardId },
        },
    });
}
