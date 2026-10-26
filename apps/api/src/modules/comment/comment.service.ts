import { prisma } from "../../prisma";
import { UpdateCommentDto, CreateCommentDto } from "./comment.types";

export function createComment(boardId: number, taskId: number, userId: number, dto: CreateCommentDto) {}

export function getComments(boardId: number, taskId: number, currentUserId: number) {}

export function updateComment(
    boardId: number,
    taskId: number,
    commentId: number,
    userId: number,
    dto: UpdateCommentDto,
) {}

export function deleteComment(boardId: number, taskId: number, commentId: number, userId: number) {}
