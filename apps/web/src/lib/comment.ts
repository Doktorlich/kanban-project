import { z } from "zod";
import { commentSchema, TaskComment } from "@myapp/shared-types";
import { apiFetch } from "@/lib/api";

export type CommentPayloadCreate = z.infer<typeof commentSchema.createCommentSchema>;
export type CommentPayloadUpdate = z.infer<typeof commentSchema.updateCommentSchema>;

export const commentKeys = {
    all: ["comment"] as const,
    list: (taskId: number) => ["comment", "task", taskId] as const,
    detail: (id: number) => ["comment", id] as const,
};
export function createComment(workspaceId: number, boardId: number, taskId: number, payload: CommentPayloadCreate) {
    return apiFetch<TaskComment>(`/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}/comments`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
export function getComments(workspaceId: number, boardId: number, taskId: number) {
    return apiFetch<TaskComment[]>(`/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}/comments`, {
        method: "GET",
    });
}

export function updateComment(
    workspaceId: number,
    boardId: number,
    taskId: number,
    commentId: number,
    payload: CommentPayloadUpdate,
) {
    return apiFetch<TaskComment>(`/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
export function deleteComment(workspaceId: number, boardId: number, taskId: number, commentId: number) {
    return apiFetch<void>(`/workspaces/${workspaceId}/boards/${boardId}/tasks/${taskId}/comments/${commentId}`, {
        method: "DELETE",
    });
}
