import { ColumnWithTasks, Task } from "@myapp/shared-types";
import {
    closestCorners,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useRef, useState } from "react";
import { findColumnByTaskId, moveTaskInColumn, moveTaskToColumn, resolveDropTarget } from "@/lib/board-dnd";

export default function useBoardDnd(serverColumns: ColumnWithTasks[] | undefined) {
    const [localColumns, setLocalColumns] = useState<ColumnWithTasks[] | null>(null);
    const [prevColumnsData, setPrevColumnsData] = useState<ColumnWithTasks[] | undefined>(undefined);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const columnsBeforeDrag = useRef<ColumnWithTasks[] | null>(null);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    if (serverColumns !== prevColumnsData) {
        setPrevColumnsData(serverColumns);
        setLocalColumns(serverColumns ?? null);
    }

    //   функции handleDragStart, handleDragOver, handleDragEnd, handleDragCancel
    function handleDragEnd(event: DragEndEvent) {
        setActiveTask(null);
        const { active, over } = event;
        if (!over || !localColumns) {
            setLocalColumns(columnsBeforeDrag.current);
            return;
        }
        if (active.id === over.id) return;

        const taskId = Number(active.id);
        const target = resolveDropTarget(localColumns, over);
        if (!target) return;

        const source = findColumnByTaskId(localColumns, taskId);
        if (!source) return;

        if (source.id === target.column.id) {
            const oldIndex = source.tasks.findIndex(t => t.id === taskId);
            const newIndex = Math.min(target.index, source.tasks.length - 1);
            if (oldIndex === newIndex) return;
            setLocalColumns(
                localColumns.map(col =>
                    col.id === source.id ? { ...col, tasks: moveTaskInColumn(col.tasks, oldIndex, newIndex) } : col,
                ),
            );
            return;
        }

        setLocalColumns(moveTaskToColumn(localColumns, taskId, target.column.id, target.index));
    }

    function handleDragStart(event: DragStartEvent) {
        const task = localColumns?.flatMap(col => col.tasks).find(t => t.id === event.active.id);
        columnsBeforeDrag.current = localColumns;
        setActiveTask(task ?? null);
    }
    function handleDragCancel() {
        setLocalColumns(columnsBeforeDrag.current);
        setActiveTask(null);
    }
    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over || !localColumns) return;

        const taskId = Number(active.id);
        const source = findColumnByTaskId(localColumns, taskId);
        const target = resolveDropTarget(localColumns, over);
        if (!source || !target || source.id === target.column.id) return;

        setLocalColumns(moveTaskToColumn(localColumns, taskId, target.column.id, target.index));
    }
    const dndContextProps = {
        sensors,
        collisionDetection: closestCorners,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
        onDragCancel: handleDragCancel,
    };

    return { localColumns, activeTask, dndContextProps };
}
