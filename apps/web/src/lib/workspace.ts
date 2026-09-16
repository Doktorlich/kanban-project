import { apiFetch } from "./api";

import { z } from "zod";
import { Workspace, workspaceSchema } from "@myapp/shared-types";

export type WorkspacePayload = z.infer<typeof workspaceSchema.workspaceSchema>;

// искусственная задержка
// await new Promise(resolve => setTimeout(resolve, 2000));
export const workspaceKeys = {
    all: ["workspace"] as const,
    detail: (id: number) => ["workspace", id] as const,
};

export function createWorkspace(payload: WorkspacePayload) {
    return apiFetch<Workspace>("/workspaces", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function getWorkspaces() {
    return apiFetch<Workspace[]>("/workspaces", {
        method: "GET",
    });
}

export function getWorkspaceById(workspaceId: number) {
    return apiFetch<Workspace>(`/workspaces/${workspaceId}`, {
        method: "GET",
    });
}

export function updateWorkspace(workspaceId: number, payload: WorkspacePayload) {
    return apiFetch<Workspace>(`/workspaces/${workspaceId}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export function deleteWorkspace(workspaceId: number) {
    return apiFetch<void>(`/workspaces/${workspaceId}`, {
        method: "DELETE",
    });
}
