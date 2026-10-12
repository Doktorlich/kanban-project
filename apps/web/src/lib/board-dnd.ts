import { ColumnWithTasks } from "@myapp/shared-types";
import { Over } from "@dnd-kit/core";
export type DropTarget = { column: ColumnWithTasks; index: number };

export function findColumnByTaskId(columns: ColumnWithTasks[], taskId: number): ColumnWithTasks | undefined {
    return columns.find(col => col.tasks.some(t => t.id === taskId));
}
export function findColumnById(columns: ColumnWithTasks[], columnId: number): ColumnWithTasks | undefined {
    return columns.find(col => col.id === columnId);
}

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
