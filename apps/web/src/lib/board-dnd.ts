import { ColumnWithTasks, Task } from "@myapp/shared-types";
import type { Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

/**
 * Куда пользователь бросил карточку:
 * - column: колонка, в которую она должна попасть
 * - index: позиция в списке задач этой колонки (0 = самая первая)
 */
export type DropTarget = { column: ColumnWithTasks; index: number };

/**
 * Ищет, в какой колонке сейчас лежит задача.
 *
 * Пример: задача 33 лежит в колонке "To do" → вернётся эта колонка.
 * Если такой задачи нет ни в одной колонке → undefined.
 */
export function findColumnByTaskId(columns: ColumnWithTasks[], taskId: number): ColumnWithTasks | undefined {
    return columns.find(col => col.tasks.some(t => t.id === taskId));
}

/**
 * Ищет колонку по её собственному id.
 * Если такой колонки нет → undefined.
 */
export function findColumnById(columns: ColumnWithTasks[], columnId: number): ColumnWithTasks | undefined {
    return columns.find(col => col.id === columnId);
}

/**
 * Понимает, куда именно пользователь отпустил карточку.
 * Данные о цели приходят от dnd-kit в объекте `over`.
 *
 * Есть два случая:
 * 1. Отпустили над колонкой (например, над пустой) →
 *    кладём в конец: index = количество задач в колонке.
 * 2. Отпустили над другой карточкой →
 *    встаём на её место: index = позиция этой карточки в её колонке.
 *
 * Если колонку найти не удалось (например, данные успели обновиться
 * во время перетаскивания) → null, и вызывающий код ничего не делает.
 */
export function resolveDropTarget(columns: ColumnWithTasks[], over: Over): DropTarget | null {
    // Случай 1: цель — колонка (её тип мы сами задали в useDroppable)
    if (over.data.current?.type === "column") {
        const column = findColumnById(columns, Number(over.data.current.columnId));
        if (!column) return null;
        return { column, index: column.tasks.length };
    }

    // Случай 2: цель — другая задача, её id лежит в over.id
    const taskId = Number(over.id);
    const column = findColumnByTaskId(columns, taskId);
    if (!column) return null;
    return { column, index: column.tasks.findIndex(t => t.id === taskId) };
}

/**
 * Меняет порядок задач внутри ОДНОЙ колонки.
 * Берёт задачу с позиции fromIndex и ставит её на позицию toIndex.
 *
 * Пример: [A, B, C] и (0 → 2) даст [B, C, A].
 * Исходный массив не меняется, возвращается новый.
 */
export function moveTaskInColumn(tasks: Task[], fromIndex: number, toIndex: number): Task[] {
    return arrayMove(tasks, fromIndex, toIndex);
}

/**
 * Переносит задачу из одной колонки в ДРУГУЮ.
 * Исходный массив колонок не меняется, возвращается новый.
 *
 * Что происходит по шагам:
 * 1. Находим колонку, где задача лежит сейчас (source).
 * 2. Делаем копию задачи с новым columnId (задача "живёт" уже в другой колонке).
 * 3. Проходим по всем колонкам и для каждой решаем, что с ней делать:
 *    - исходная колонка: убираем из неё задачу;
 *    - целевая колонка: вставляем задачу на позицию targetIndex;
 *    - остальные: оставляем как есть.
 *
 * Если что-то не так, возвращаем колонки без изменений:
 * - задача не найдена;
 * - исходная и целевая колонка одна и та же (для этого есть moveTaskInColumn).
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
        // Исходная колонка: оставляем все задачи, кроме перенесённой
        if (col.id === source.id) {
            return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
        }
        // Целевая колонка: задачи до позиции + перенесённая + задачи после
        if (col.id === targetColumnId) {
            return {
                ...col,
                tasks: [...col.tasks.slice(0, targetIndex), movedTask, ...col.tasks.slice(targetIndex)],
            };
        }
        // Остальные колонки не трогаем
        return col;
    });
}
