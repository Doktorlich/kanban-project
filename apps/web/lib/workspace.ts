// createWorkspace
// getWorkspaces
// getWorkspaceById
// updateWorkspace
// deleteWorkspace
import { apiFetch } from "./api";

import { z } from "zod";
import { Workspace, workspaceSchema } from "@myapp/shared-types";

type WorkspacePayload = z.infer<typeof workspaceSchema.workspaceSchema>;

export function getWorkspaces() {
    return apiFetch<Workspace[]>("/workspaces", {
        method: "GET",
    });
}
