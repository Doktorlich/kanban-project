import { z } from "zod";
import { Task, taskSchema } from "@myapp/shared-types";
import { apiFetch } from "@/lib/api";

export type TaskPayloadCreate = z.infer<typeof taskSchema.createTaskSchema>;
export type TaskPayloadUpdate = z.infer<typeof taskSchema.updateTaskSchema>;

export const taskKeys = {
    all: ["task"] as const,
    list: (columnId: number) => ["task", "column", columnId] as const,
    detail: (id: number) => ["task", id] as const,
};
export function createTask(workspaceId: number, boardId: number, columnId: number, payload: TaskPayloadCreate) {
    return apiFetch<Task>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}/tasks/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function getTasks(workspaceId: number, boardId: number, columnId: number) {
    return apiFetch<Task[]>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}/tasks/`, {
        method: "GET",
    });
}

export function getTaskById(workspaceId: number, boardId: number, columnId: number, taskId: number) {
    return apiFetch<Task>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        method: "GET",
    });
}

export function updateTask(
    workspaceId: number,
    boardId: number,
    columnId: number,
    taskId: number,
    payload: TaskPayloadUpdate,
) {
    return apiFetch<Task>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}

export function deleteTask(workspaceId: number, boardId: number, columnId: number, taskId: number) {
    return apiFetch<void>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        method: "DELETE",
    });
}
