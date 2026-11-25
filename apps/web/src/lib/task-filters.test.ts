import { describe, expect, it } from "vitest";
import type { Task } from "@myapp/shared-types";
import { filterTasksByPriority, filterTasksBySearch, sortTasksByUpdatedAt } from "./task-filters";

type TaskOverrides = {
    id: number;
    title?: string;
    description?: string | null;
    priorityId?: number;
    updatedAt?: string;
};

function makeTask({ id, title, description, priorityId, updatedAt }: TaskOverrides): Task {
    return {
        id,
        title: title ?? `Task ${id}`,
        description: description ?? null,
        position: 0,
        columnId: 1,
        priority: { id: priorityId ?? 1, name: "priority", color: "#000000", weight: 1 },
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: updatedAt ?? "2026-01-01T00:00:00.000Z",
        owners: [],
    };
}

const ids = (tasks: Task[]) => tasks.map(task => task.id);

describe("filterTasksByPriority", () => {
    const tasks = [
        makeTask({ id: 1, priorityId: 1 }),
        makeTask({ id: 2, priorityId: 2 }),
        makeTask({ id: 3, priorityId: 1 }),
    ];

    it("returns the same array when no priority is selected", () => {
        expect(filterTasksByPriority(tasks, null)).toBe(tasks);
    });

    it("keeps only tasks with the selected priority", () => {
        expect(ids(filterTasksByPriority(tasks, 1))).toEqual([1, 3]);
    });

    it("returns an empty array when nothing matches", () => {
        expect(filterTasksByPriority(tasks, 99)).toEqual([]);
    });
});

describe("filterTasksBySearch", () => {
    const tasks = [
        makeTask({ id: 1, title: "Fix login bug", description: "Users cannot sign in" }),
        makeTask({ id: 2, title: "Write docs", description: null }),
        makeTask({ id: 3, title: "Refactor board", description: "Login page cleanup" }),
    ];

    it("returns the same array for an empty or whitespace query", () => {
        expect(filterTasksBySearch(tasks, "")).toBe(tasks);
        expect(filterTasksBySearch(tasks, "   ")).toBe(tasks);
    });

    it("matches the title ignoring case", () => {
        expect(ids(filterTasksBySearch(tasks, "FIX"))).toEqual([1]);
    });

    it("matches the description", () => {
        expect(ids(filterTasksBySearch(tasks, "cleanup"))).toEqual([3]);
    });

    it("matches both title and description", () => {
        expect(ids(filterTasksBySearch(tasks, "login"))).toEqual([1, 3]);
    });

    it("trims the query", () => {
        expect(ids(filterTasksBySearch(tasks, "  docs  "))).toEqual([2]);
    });

    it("does not crash on a task without description", () => {
        expect(filterTasksBySearch(tasks, "zzz")).toEqual([]);
    });

    it("returns an empty array when nothing matches", () => {
        expect(filterTasksBySearch(tasks, "database")).toEqual([]);
    });
});

describe("sortTasksByUpdatedAt", () => {
    const tasks = [
        makeTask({ id: 1, updatedAt: "2026-01-02T00:00:00.000Z" }),
        makeTask({ id: 2, updatedAt: "2026-01-03T00:00:00.000Z" }),
        makeTask({ id: 3, updatedAt: "2026-01-01T00:00:00.000Z" }),
    ];

    it("returns the same array when sorting is off", () => {
        expect(sortTasksByUpdatedAt(tasks, null)).toBe(tasks);
    });

    it("sorts oldest first", () => {
        expect(ids(sortTasksByUpdatedAt(tasks, "updatedAt-asc"))).toEqual([3, 1, 2]);
    });

    it("sorts newest first", () => {
        expect(ids(sortTasksByUpdatedAt(tasks, "updatedAt-desc"))).toEqual([2, 1, 3]);
    });

    it("does not mutate the source array", () => {
        sortTasksByUpdatedAt(tasks, "updatedAt-desc");

        expect(ids(tasks)).toEqual([1, 2, 3]);
    });
});
