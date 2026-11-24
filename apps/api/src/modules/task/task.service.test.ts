import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    columnCount: vi.fn(),
    taskFindMany: vi.fn(),
    taskUpdate: vi.fn(),
    transaction: vi.fn(),
}));

// Подменяем Prisma: тестируем правила переноса, а не базу
vi.mock("../../prisma", () => ({
    prisma: {
        column: { count: mocks.columnCount },
        task: { findMany: mocks.taskFindMany, update: mocks.taskUpdate },
        $transaction: mocks.transaction,
    },
}));

import { reorderTasks } from "./task.service";

const BOARD_ID = 10;

describe("reorderTasks", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("rejects duplicate column ids", async () => {
        await expect(
            reorderTasks(BOARD_ID, {
                columns: [
                    { columnId: 1, taskIds: [1] },
                    { columnId: 1, taskIds: [2] },
                ],
            }),
        ).rejects.toThrow("Duplicate column ids");

        expect(mocks.columnCount).not.toHaveBeenCalled();
    });

    it("rejects the same task listed twice", async () => {
        await expect(
            reorderTasks(BOARD_ID, {
                columns: [
                    { columnId: 1, taskIds: [5] },
                    { columnId: 2, taskIds: [5] },
                ],
            }),
        ).rejects.toThrow("Duplicate task ids");

        expect(mocks.columnCount).not.toHaveBeenCalled();
    });

    it("rejects columns that do not belong to the board", async () => {
        mocks.columnCount.mockResolvedValue(1); // из двух запрошенных колонок доске принадлежит одна

        await expect(
            reorderTasks(BOARD_ID, {
                columns: [
                    { columnId: 1, taskIds: [1] },
                    { columnId: 2, taskIds: [2] },
                ],
            }),
        ).rejects.toThrow("Column not found");

        expect(mocks.columnCount).toHaveBeenCalledWith({ where: { id: { in: [1, 2] }, boardId: BOARD_ID } });
        expect(mocks.taskFindMany).not.toHaveBeenCalled();
        expect(mocks.transaction).not.toHaveBeenCalled();
    });

    it("rejects tasks that do not belong to the board", async () => {
        mocks.columnCount.mockResolvedValue(1);
        mocks.taskFindMany.mockResolvedValue([]); // запрошена задача 5, но на этой доске её нет

        await expect(reorderTasks(BOARD_ID, { columns: [{ columnId: 1, taskIds: [5] }] })).rejects.toThrow(
            "Task not found",
        );

        expect(mocks.taskFindMany).toHaveBeenCalledWith({
            where: { id: { in: [5] }, column: { boardId: BOARD_ID } },
            select: { id: true, updatedAt: true },
        });
        expect(mocks.transaction).not.toHaveBeenCalled();
    });

    it("writes columnId and position by index and keeps the previous updatedAt", async () => {
        const updatedAtById = {
            11: new Date("2026-01-01T10:00:00Z"),
            12: new Date("2026-01-02T10:00:00Z"),
            21: new Date("2026-01-03T10:00:00Z"),
        };
        mocks.columnCount.mockResolvedValue(2);
        mocks.taskFindMany.mockResolvedValue([
            { id: 11, updatedAt: updatedAtById[11] },
            { id: 12, updatedAt: updatedAtById[12] },
            { id: 21, updatedAt: updatedAtById[21] },
        ]);
        // update возвращает свои аргументы: так видно, что именно попало в транзакцию
        mocks.taskUpdate.mockImplementation((args: unknown) => args);

        await reorderTasks(BOARD_ID, {
            columns: [
                { columnId: 1, taskIds: [12, 11] },
                { columnId: 2, taskIds: [21] },
            ],
        });

        expect(mocks.transaction).toHaveBeenCalledTimes(1);
        expect(mocks.transaction).toHaveBeenCalledWith([
            { where: { id: 12 }, data: { columnId: 1, position: 0, updatedAt: updatedAtById[12] } },
            { where: { id: 11 }, data: { columnId: 1, position: 1, updatedAt: updatedAtById[11] } },
            { where: { id: 21 }, data: { columnId: 2, position: 0, updatedAt: updatedAtById[21] } },
        ]);
    });

    it("allows a column to become empty after its last task was moved out", async () => {
        const updatedAt = new Date("2026-01-01T10:00:00Z");
        mocks.columnCount.mockResolvedValue(2);
        mocks.taskFindMany.mockResolvedValue([{ id: 7, updatedAt }]);
        mocks.taskUpdate.mockImplementation((args: unknown) => args);

        await reorderTasks(BOARD_ID, {
            columns: [
                { columnId: 1, taskIds: [] },
                { columnId: 2, taskIds: [7] },
            ],
        });

        expect(mocks.transaction).toHaveBeenCalledWith([
            { where: { id: 7 }, data: { columnId: 2, position: 0, updatedAt } },
        ]);
    });
});
