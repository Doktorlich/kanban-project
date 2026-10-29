import { prisma } from "../../prisma";
import { UpdateCommentDto, CreateCommentDto } from "./comment.types";
import { publicUserSelect } from "../../lib/prisma-selects";

export async function createComment(boardId: number, taskId: number, userId: number, dto: CreateCommentDto) {
    const task = await prisma.task.findFirst({
        where: { id: taskId, column: { boardId } },
        select: { id: true },
    });
    if (!task) throw new Error("Task not found");
    const comment = await prisma.comment.create({
        data: { taskId, userId, text: dto.text },
        include: { user: { select: publicUserSelect } },
    });
    return { ...comment, isAuthor: true };
}

export async function getComments(boardId: number, taskId: number, currentUserId: number) {
    const comments = await prisma.comment.findMany({
        where: {
            taskId,
            task: { column: { boardId } },
        },
        include: { user: { select: publicUserSelect } },
        orderBy: { createdAt: "asc" },
    });
    return comments.map(comment => ({ ...comment, isAuthor: comment.userId === currentUserId }));
}

export async function updateComment(
    boardId: number,
    taskId: number,
    commentId: number,
    userId: number,
    dto: UpdateCommentDto,
) {
    const existing = await prisma.comment.findFirst({
        where: { id: commentId, taskId, userId, task: { column: { boardId } } },
        select: { id: true },
    });
    if (!existing) throw new Error("Comment not found");

    const comment = await prisma.comment.update({
        where: { id: commentId },
        data: { text: dto.text },
        include: { user: { select: publicUserSelect } },
    });
    return { ...comment, isAuthor: true };
}

export async function deleteComment(boardId: number, taskId: number, commentId: number, userId: number) {
    const existing = await prisma.comment.findFirst({
        where: { id: commentId, taskId, userId, task: { column: { boardId } } },
        select: { id: true },
    });
    if (!existing) throw new Error("Comment not found");

    await prisma.comment.delete({ where: { id: commentId } });
}
