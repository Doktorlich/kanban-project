import { apiFetch } from "@/lib/api";
import { Priority } from "@myapp/shared-types";

export const priorityKeys = {
    all: ["priority"] as const,
};

export function getPriorities() {
    return apiFetch<Priority[]>("/priorities", {
        method: "GET",
    });
}
