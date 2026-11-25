import { describe, expect, it } from "vitest";
import type { Over } from "@dnd-kit/core";
import type { ColumnWithTasks, Task } from "@myapp/shared-types";
import {
    applyTaskMove,
    buildReorderPayload,
    findColumnById,
    findColumnByTaskId,
    moveTaskInColumn,
    moveTaskToColumn,
    resolveDropTarget,
} from "./board-dnd";

// --- Помощники ---

function makeTask(id: number, columnId: number): Task {
    return {
        id,
        title: `Task ${id}`,
        description: null,
        position: 0,
        columnId,
        priority: { id: 1, name: "low", color: "#00ff00", weight: 1 },
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        owners: [],
    };
}

function makeColumn(id: number, taskIds: number[]): ColumnWithTasks {
    return { id, title: `Column ${id}`, position: id, tasks: taskIds.map(taskId => makeTask(taskId, id)) };
}

// Свежая доска на каждый тест: колонка 1 -> [11, 12, 13], колонка 2 -> [21], колонка 3 -> пустая
function makeBoard(): ColumnWithTasks[] {
    return [makeColumn(1, [11, 12, 13]), makeColumn(2, [21]), makeColumn(3, [])];
}

// id задач в колонке в текущем порядке
function idsIn(columns: ColumnWithTasks[], columnId: number): number[] | undefined {
    return findColumnById(columns, columnId)?.tasks.map(task => task.id);
}

// Минимальный объект over, как его отдаёт dnd-kit: нужны только id и data.current
function makeOver(id: string | number, data?: Record<string, unknown>): Over {
    return { id, data: { current: data } } as unknown as Over;
}

// --- Тесты ---

describe("findColumnByTaskId / findColumnById", () => {
    it("finds the column that contains the task", () => {
        expect(findColumnByTaskId(makeBoard(), 21)?.id).toBe(2);
    });

    it("returns undefined for an unknown task", () => {
        expect(findColumnByTaskId(makeBoard(), 999)).toBeUndefined();
    });

    it("finds a column by its id", () => {
        expect(findColumnById(makeBoard(), 3)?.id).toBe(3);
    });

    it("returns undefined for an unknown column", () => {
        expect(findColumnById(makeBoard(), 999)).toBeUndefined();
    });
});

describe("resolveDropTarget", () => {
    it("puts the task to the end when dropped over a column", () => {
        const board = makeBoard();
        const target = resolveDropTarget(board, makeOver("column-1", { type: "column", columnId: 1 }));

        expect(target?.column.id).toBe(1);
        expect(target?.index).toBe(3);
    });

    it("uses index 0 when dropped over an empty column", () => {
        const target = resolveDropTarget(makeBoard(), makeOver("column-3", { type: "column", columnId: 3 }));

        expect(target?.column.id).toBe(3);
        expect(target?.index).toBe(0);
    });

    it("takes the place of another task when dropped over it", () => {
        const target = resolveDropTarget(makeBoard(), makeOver(12, { type: "task" }));

        expect(target?.column.id).toBe(1);
        expect(target?.index).toBe(1);
    });

    it("returns null for an unknown task", () => {
        expect(resolveDropTarget(makeBoard(), makeOver(999, { type: "task" }))).toBeNull();
    });

    it("returns null for an unknown column", () => {
        expect(resolveDropTarget(makeBoard(), makeOver("column-999", { type: "column", columnId: 999 }))).toBeNull();
    });
});

describe("moveTaskInColumn", () => {
    it("moves a task to another index without mutating the source array", () => {
        const tasks = makeColumn(1, [11, 12, 13]).tasks;

        const moved = moveTaskInColumn(tasks, 0, 2);

        expect(moved.map(task => task.id)).toEqual([12, 13, 11]);
        expect(tasks.map(task => task.id)).toEqual([11, 12, 13]);
    });
});

describe("moveTaskToColumn", () => {
    it("moves the task to the target column at the given index", () => {
        const result = moveTaskToColumn(makeBoard(), 12, 2, 0);

        expect(idsIn(result, 1)).toEqual([11, 13]);
        expect(idsIn(result, 2)).toEqual([12, 21]);
    });

    it("updates columnId of the moved task", () => {
        const result = moveTaskToColumn(makeBoard(), 12, 2, 0);

        expect(findColumnById(result, 2)?.tasks[0].columnId).toBe(2);
    });

    it("can move a task into an empty column", () => {
        const result = moveTaskToColumn(makeBoard(), 11, 3, 0);

        expect(idsIn(result, 3)).toEqual([11]);
    });

    it("does not mutate the input and keeps untouched columns by reference", () => {
        const board = makeBoard();
        const snapshot = JSON.parse(JSON.stringify(board));

        const result = moveTaskToColumn(board, 12, 2, 0);

        expect(board).toEqual(snapshot);
        expect(result[2]).toBe(board[2]);
    });

    it("returns the same columns when the target is the source column", () => {
        const board = makeBoard();

        expect(moveTaskToColumn(board, 12, 1, 0)).toBe(board);
    });

    it("returns the same columns for an unknown task", () => {
        const board = makeBoard();

        expect(moveTaskToColumn(board, 999, 2, 0)).toBe(board);
    });
});

describe("applyTaskMove", () => {
    it("moves a task to another column", () => {
        const board = makeBoard();

        const result = applyTaskMove(board, 11, { column: board[1], index: 1 });

        expect(idsIn(result, 1)).toEqual([12, 13]);
        expect(idsIn(result, 2)).toEqual([21, 11]);
    });

    it("reorders tasks inside the same column", () => {
        const board = makeBoard();

        const result = applyTaskMove(board, 11, { column: board[0], index: 2 });

        expect(idsIn(result, 1)).toEqual([12, 13, 11]);
    });

    it("clamps the index when it points past the end of the column", () => {
        const board = makeBoard();

        // индекс 3 равен длине списка (бросок на пустое место колонки), последний допустимый индекс 2
        const result = applyTaskMove(board, 11, { column: board[0], index: 3 });

        expect(idsIn(result, 1)).toEqual([12, 13, 11]);
    });

    it("returns the same reference when the position did not change", () => {
        const board = makeBoard();

        expect(applyTaskMove(board, 12, { column: board[0], index: 1 })).toBe(board);
    });

    it("returns the same reference for an unknown task", () => {
        const board = makeBoard();

        expect(applyTaskMove(board, 999, { column: board[1], index: 0 })).toBe(board);
    });
});

describe("buildReorderPayload", () => {
    it("returns null when nothing changed", () => {
        expect(buildReorderPayload(makeBoard(), makeBoard())).toBeNull();
    });

    it("contains only the changed column for a move inside one column", () => {
        const before = makeBoard();
        const after = applyTaskMove(before, 11, { column: before[0], index: 2 });

        expect(buildReorderPayload(before, after)).toEqual({
            columns: [{ columnId: 1, taskIds: [12, 13, 11] }],
        });
    });

    it("contains both columns for a move between columns", () => {
        const before = makeBoard();
        const after = applyTaskMove(before, 12, { column: before[1], index: 1 });

        expect(buildReorderPayload(before, after)).toEqual({
            columns: [
                { columnId: 1, taskIds: [11, 13] },
                { columnId: 2, taskIds: [21, 12] },
            ],
        });
    });

    it("sends an empty list for a column that lost its last task", () => {
        const before = makeBoard();
        const after = applyTaskMove(before, 21, { column: before[2], index: 0 });

        expect(buildReorderPayload(before, after)).toEqual({
            columns: [
                { columnId: 2, taskIds: [] },
                { columnId: 3, taskIds: [21] },
            ],
        });
    });
});
