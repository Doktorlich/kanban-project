import { z } from "zod";
import { apiFetch } from "@/lib/api";
import { Board } from "@myapp/shared-types";
import { boardSchema } from "@myapp/shared-types";

export type BoardPayload = z.infer<typeof boardSchema.boardSchema>;

export const boardKeys = {
    all: ["board"] as const,
    list: (workspaceId: number) => ["board", "workspace", workspaceId] as const,
    detail: (id: number) => ["board", id] as const,
};

export function createBoard(workspaceId: number, payload: BoardPayload) {
    return apiFetch<Board>(`/workspaces/${workspaceId}/boards/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
export function getBoards(workspaceId: number) {
    return apiFetch<Board[]>(`/workspaces/${workspaceId}/boards/`, {
        method: "GET",
    });
}
export function getBoardById(workspaceId: number, boardId: number) {
    return apiFetch<Board>(`/workspaces/${workspaceId}/boards/${boardId}`, {
        method: "GET",
    });
}
export function updateBoard(workspaceId: number, boardId: number, payload: BoardPayload) {
    return apiFetch<Board>(`/workspaces/${workspaceId}/boards/${boardId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
export function deleteBoard(workspaceId: number, boardId: number) {
    return apiFetch<void>(`/workspaces/${workspaceId}/boards/${boardId}`, {
        method: "DELETE",
    });
}
