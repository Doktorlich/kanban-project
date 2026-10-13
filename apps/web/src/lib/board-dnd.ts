import { ColumnWithTasks, Task } from "@myapp/shared-types";
import type { Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export type DropTarget = { column: ColumnWithTasks; index: number };

/**
 * Находит колонку, в которой лежит задача с указанным id.
 * Возвращает undefined, если задача не найдена ни в одной колонке.
 */
export function findColumnByTaskId(columns: ColumnWithTasks[], taskId: number): ColumnWithTasks | undefined {
    return columns.find(col => col.tasks.some(t => t.id === taskId));
}

/**
 * Находит колонку по её id.
 * Возвращает undefined, если такой колонки нет.
 */
export function findColumnById(columns: ColumnWithTasks[], columnId: number): ColumnWithTasks | undefined {
    return columns.find(col => col.id === columnId);
}

/**
 * Определяет, куда пользователь бросил перетаскиваемую задачу.
 * Обрабатывает два случая:
 * 1. Бросок на колонку — вставка в конец (index = tasks.length)
 * 2. Бросок на задачу — вставка на позицию этой задачи
 * Возвращает null, если цель невалидна.
 */
export function resolveDropTarget(columns: ColumnWithTasks[], over: Over): DropTarget | null {
    if (over.data.current?.type === "column") {
        const column = findColumnById(columns, Number(over.data.current.columnId));
        if (!column) return null;
        return { column, index: column.tasks.length };
    }

    const taskId = Number(over.id);
    const column = findColumnByTaskId(columns, taskId);
    if (!column) return null;
    return { column, index: column.tasks.findIndex(t => t.id === taskId) };
}

/**
 * Переставляет задачи внутри одной колонки.
 * Использует arrayMove из dnd-kit для корректного пересчёта индексов.
 */
export function moveTaskInColumn(tasks: Task[], fromIndex: number, toIndex: number): Task[] {
    return arrayMove(tasks, fromIndex, toIndex);
}

/**
 * Переносит задачу из одной колонки в другую на указанную позицию.
 * Возвращает новый массив колонок, не мутируя исходный.
 * Обновляет columnId у перенесённой задачи.
 * Если задача или колонка не найдены, или перемещение внутри той же колонки — возвращает исходный массив.
 */
export function moveTaskToColumn(
    columns: ColumnWithTasks[],
    taskId: number,
    targetColumnId: number,
    targetIndex: number,
): ColumnWithTasks[] {
    const source = findColumnByTaskId(columns, taskId);
    if (!source) return columns;
    if (source.id === targetColumnId) return columns;

    const task = source.tasks.find(t => t.id === taskId);
    if (!task) return columns;

    const movedTask = { ...task, columnId: targetColumnId };

    return columns.map(col => {
        if (col.id === source.id) {
            return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
        }
        if (col.id === targetColumnId) {
            return {
                ...col,
                tasks: [...col.tasks.slice(0, targetIndex), movedTask, ...col.tasks.slice(targetIndex)],
            };
        }
        return col;
    });
}
