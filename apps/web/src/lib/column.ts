import { z } from "zod";
import { columnSchema } from "@myapp/shared-types";
import { apiFetch } from "@/lib/api";
import { Column } from "@myapp/shared-types";
import { ColumnWithTasks } from "@myapp/shared-types";

export type ColumnPayloadCreate = z.infer<typeof columnSchema.createColumnSchema>;
export type ColumnPayloadUpdate = z.infer<typeof columnSchema.updateColumnSchema>;

export const columnKeys = {
    all: ["column"] as const,
    list: (boardId: number) => ["column", "board", boardId] as const,
    detail: (id: number) => ["column", id] as const,
};

export function createColumn(workspaceId: number, boardId: number, payload: ColumnPayloadCreate) {
    return apiFetch<Column>(`/workspaces/${workspaceId}/boards/${boardId}/columns/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function getColumns(workspaceId: number, boardId: number) {
    return apiFetch<ColumnWithTasks[]>(`/workspaces/${workspaceId}/boards/${boardId}/columns/`, {
        method: "GET",
    });
}
export function getColumnById(workspaceId: number, boardId: number, columnId: number) {
    return apiFetch<Column>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}`, {
        method: "GET",
    });
}
export function updateColumn(workspaceId: number, boardId: number, columnId: number, payload: ColumnPayloadUpdate) {
    return apiFetch<Column>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
}
export function deleteColumn(workspaceId: number, boardId: number, columnId: number) {
    return apiFetch<void>(`/workspaces/${workspaceId}/boards/${boardId}/columns/${columnId}`, {
        method: "DELETE",
    });
}
